<?php

namespace App\Filament\Resources\PenyewaResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use App\Models\Transaksi;
use Filament\Tables\Columns\{TextColumn};
use Carbon\Carbon;

use Filament\Forms\Components\{DatePicker, Section, Grid, TextInput, TextArea, Select};
use App\Models\Kontrakan;
use Filament\Support\RawJs;
use Filament\Support\Enums\MaxWidth;

class TransaksiRelationManager extends RelationManager
{
  protected static string $relationship = 'transaksis';

  public static function getOptionsKontrakan(int $id_kontrakan = null): array
  {
    $tidakTersedia = [];
    // If $id_kontrakan is not null, fetch kontrakan with 'tidak tersedia' status for the given id
    if ($id_kontrakan !== null) {
      $tidakTersedia = Kontrakan::where('id', $id_kontrakan)
        ->get(['id', 'nama'])
        ->toArray();

      // If there's a matching record, update its status to 'tersedia'
      if (!empty($tidakTersedia)) {
        foreach ($tidakTersedia as &$kontrakan) {
          $kontrakan['status'] = 'tersedia';
        }
      }
    }

    // Fetch kontrakan with 'tersedia' status as an array
    $tersedia = Kontrakan::where('status', 'tersedia')
      ->get(['id', 'nama'])
      ->toArray();

    // Merge both arrays
    $mergedArray = array_merge($tidakTersedia, $tersedia);

    // Convert the merged array into a collection to use pluck
    $options = collect($mergedArray)->pluck('nama', 'id')->toArray();

    // Check if options are empty
    if (empty($options)) {
      return ['' => 'Tidak ada kontrakan tersedia'];
    }

    return $options;
  }

  public function form(Form $form): Form
  {
    return $form->schema([
      Section::make('Unit Sewa') // Membuat judul untuk section
        ->schema([
          Grid::make(1)->schema([
            DatePicker::make('created_at')
              ->label('Tanggal Dibuat')
              ->disabled()
              ->default(Carbon::now()->format('Y-m-d'))
              ->native(false)
              ->displayFormat('d F Y'),
          ]),
          Grid::make(2) // Membuat grid dengan 2 kolom
            ->schema([
              Select::make('id_kontrakan')
                ->label('Nama Kontrakan')
                ->options(
                  fn(callable $get) => self::getOptionsKontrakan($get('id_kontrakan') ?? null)
                )
                ->required()
                ->searchable()
                ->preload()
                ->afterStateUpdated(function (callable $set, $state) {
                  $set('tipe_pembayaran', null);
                  $set('tanggal', null);
                  $set('tgl_pembayaran_berikutnya', null);
                  $set('jumlah_pemasukan', null);
                  $set('jumlah_kekurangan_visible', false);
                  $set('bayar_dp', null);
                  $set('bayar_dp_visible', false);
                  // Set 'nama' (Unit Sewa) based on selected 'id_kontrakan'
                  if ($state) {
                    $kontrakan = Kontrakan::find($state);
                    if ($kontrakan) {
                      $set('nama_kontrakan', $kontrakan->nama);
                    } else {
                      $set('nama_kontrakan', null);
                    }
                  } else {
                    $set('nama_kontrakan', null);
                  }
                })
                ->reactive()
                ->debounce('500ms'),

              Select::make('tipe_pembayaran')
                ->label('Tipe Pembayaran')
                ->options(function (callable $get) {
                  $idKontrakan = $get('id_kontrakan');

                  // If no 'id_kontrakan' is selected, return an empty array
                  if (!$idKontrakan) {
                    return [];
                  }

                  // Fetch the Kontrakan by ID
                  $kontrakan = Kontrakan::find($idKontrakan);

                  // Initialize an empty array to store options
                  $options = [];

                  // Extract harga_sewa and add to options
                  if ($kontrakan) {
                    foreach ($kontrakan->harga_sewa as $item) {
                      $options[$item['durasi']] = $item['durasi'];
                    }
                  }

                  return $options;
                })
                ->suffix('Bulan')
                ->required()
                ->preload()
                ->hint('Pilih nama kontrakan dahulu')
                ->disabled(function (callable $get) {
                  return !$get('id_kontrakan');
                })
                ->afterStateUpdated(function (callable $set, callable $get, $state) {
                  $idKontrakan = $get('id_kontrakan');
                  $tanggal = $get('tanggal');

                  if ($idKontrakan && $state) {
                    $kontrakan = Kontrakan::find($idKontrakan);
                    $durasi = (int) $state;

                    $harga =
                      collect($kontrakan->harga_sewa)->firstWhere('durasi', $durasi)['harga'] ?? 0;
                    $formattedHarga = number_format($harga, 0, ',', '.');

                    $set('jumlah_pemasukan', $formattedHarga);

                    if ($tanggal) {
                      $tglPembayaranBerikutnya = Carbon::parse($tanggal)
                        ->addMonths($durasi)
                        ->format('Y-m-d');
                      $formattedStartDate = Carbon::parse($tanggal)->translatedFormat('d F Y');
                      $formattedEndDate = Carbon::parse($tglPembayaranBerikutnya)->translatedFormat(
                        'd F Y'
                      );

                      $set('tgl_pembayaran_berikutnya', $tglPembayaranBerikutnya);
                      $namaKontrakan = "{$kontrakan->nama} - {$durasi} Bulan ({$formattedStartDate} s/d {$formattedEndDate})";
                    } else {
                      $set('tgl_pembayaran_berikutnya', null);
                      $namaKontrakan = "{$kontrakan->nama} - {$durasi} Bulan";
                    }

                    $set('nama_kontrakan', $namaKontrakan);

                    // Recalculate and update jumlah_kekurangan
                    $bayarDp = (int) str_replace(['.', ','], '', $get('bayar_dp'));
                    $jumlahPemasukan = (int) str_replace(['.', ','], '', $formattedHarga);
                    // Correct calculation for jumlahKekurangan
                    $jumlahKekurangan = $jumlahPemasukan - $bayarDp;

                    // Reset bayar_dp if it exceeds jumlah_pemasukan
                    if ($bayarDp > $jumlahPemasukan) {
                      $set('bayar_dp', number_format($jumlahPemasukan, 0, ',', '.'));
                      $bayarDp = $jumlahPemasukan;
                      $jumlahKekurangan = 0;
                    }

                    $set('jumlah_kekurangan', number_format($jumlahKekurangan, 0, ',', '.'));
                    // $set('jumlah_kekurangan_visible', $jumlahKekurangan > 0);
                  } else {
                    $set('jumlah_pemasukan', null);
                    $set('tgl_pembayaran_berikutnya', null);

                    if ($idKontrakan) {
                      $kontrakan = Kontrakan::find($idKontrakan);
                      $set('nama_kontrakan', $kontrakan->nama);
                    }
                  }
                })
                ->reactive()
                ->debounce('500ms'),

              DatePicker::make('tanggal')
                ->required()
                ->label('Tanggal Mulai')
                ->maxDate(function (callable $get) {
                  $tanggal = $get('tgl_pembayaran_berikutnya');
                  return $tanggal;
                })
                ->afterStateUpdated(function (callable $set, callable $get, $state) {
                  if ($state) {
                    $tipePembayaran = (int) $get('tipe_pembayaran');
                    $idKontrakan = $get('id_kontrakan');
                    $kontrakan = Kontrakan::find($idKontrakan);

                    if ($tipePembayaran && $kontrakan) {
                      // Calculate the end date
                      $tglPembayaranBerikutnya = Carbon::parse($state)
                        ->addMonths($tipePembayaran)
                        ->format('Y-m-d');
                      $set('tgl_pembayaran_berikutnya', $tglPembayaranBerikutnya);

                      // Format dates
                      $formattedStartDate = Carbon::parse($state)->translatedFormat('d F Y');
                      $formattedEndDate = Carbon::parse($tglPembayaranBerikutnya)->translatedFormat(
                        'd F Y'
                      );

                      // Update the 'nama_kontrakan' field with the new value
                      $set(
                        'nama_kontrakan',
                        "{$kontrakan->nama} - {$tipePembayaran} Bulan ({$formattedStartDate} s/d {$formattedEndDate})"
                      );
                    }
                  } else {
                    $set('tgl_pembayaran_berikutnya', null);
                    $idKontrakan = $get('id_kontrakan');
                    $kontrakan = Kontrakan::find($idKontrakan);
                    $tipePembayaran = (int) $get('tipe_pembayaran');
                    if ($kontrakan) {
                      $set('nama_kontrakan', "{$kontrakan->nama} - {$tipePembayaran} Bulan");
                    }
                  }
                })
                ->reactive()
                ->debounce('500ms')
                ->disabled(function (callable $get) {
                  return !$get('tipe_pembayaran');
                })
                ->hint('Pilih tipe pembayaran dahulu'),

              DatePicker::make('tgl_pembayaran_berikutnya')
                ->required()
                ->label('Tanggal Pembayaran Berikutnya')
                ->minDate(function (callable $get) {
                  $tanggal = $get('tanggal');
                  return $tanggal;
                })
                ->reactive()
                ->disabled(function (callable $get) {
                  return !$get('tanggal');
                })
                ->hint('Pilih tanggal mulai dahulu')
                ->readOnly(),

              TextInput::make('bayar_dp')
                ->label('Bayar DP')
                ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->autocomplete('off')
                ->reactive()
                ->afterStateUpdated(function (callable $set, callable $get, $state) {
                  $jumlahPemasukan = $get('jumlah_pemasukan');

                  // Remove any commas and convert to integer for comparison
                  $bayarDp = (int) str_replace(['.', ','], '', $state);
                  $jumlahPemasukan = (int) str_replace(['.', ','], '', $jumlahPemasukan);

                  // Ensure bayar_dp does not exceed jumlah_pemasukan
                  if ($bayarDp > $jumlahPemasukan) {
                    $bayarDp = $jumlahPemasukan;
                    // Format the value back to a string with thousand separators
                    $set('bayar_dp', number_format($bayarDp, 0, ',', '.'));
                  }

                  // Calculate the remaining amount (jumlah kekurangan)
                  $jumlahKekurangan = $jumlahPemasukan - $bayarDp;
                  $set('jumlah_kekurangan', number_format($jumlahKekurangan, 0, ',', '.'));

                  // Update visibility based on bayar_dp value
                  $set('bayar_dp_visible', !empty($state));
                  $set('jumlah_kekurangan_visible', $bayarDp > 0);
                }),

              TextInput::make('jumlah_pemasukan')
                ->label('Jumlah')
                // ->numeric()
                ->mask(RawJs::make('$money($input)')) // Mask untuk menampilkan format mata uang
                ->stripCharacters(',') // Menghapus koma dari input
                ->prefix('Rp') // Menambahkan prefix "Rp" untuk tampilan
                ->readOnly() // Membaca hanya
                ->extraAttributes([
                  'style' => 'background-color: rgb(248 113 113 / 50%);', // Warna latar belakang
                ]),

              Select::make('jenis_transaksi')
                ->label('Jenis Transaksi')
                ->options([
                  'pemasukan' => 'Pemasukan',
                ])
                ->default('pemasukan')
                ->hidden(),
            ]),

          Grid::make(1) // Membuat grid dengan 2 kolom
            ->schema([
              Select::make('status_pembayaran')
                ->label('Status Pembayaran')
                ->options([
                  'tertunda' => 'Belum Lunas',
                  'dibayar' => 'Lunas',
                ])
                ->required(),
              Textarea::make('catatan')
                ->maxLength(255)
                ->nullable() // Allow the field to be empty
                ->label('Catatan'),
            ]),
        ]),

      Section::make('Ringkasan') // Membuat judul untuk section
        ->schema([
          Grid::make(1) // Membuat grid dengan 2 kolom
            ->schema([
              TextInput::make('nama_kontrakan')->label('Unit Sewa')->reactive()->readOnly(),
              TextInput::make('bayar_dp')
                ->label('Bayar DP')
                ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->readOnly()
                ->reactive()
                ->visible(fn(callable $get) => $get('bayar_dp_ringkasan_visible')),
              TextInput::make('jumlah_pemasukan')
                ->label('Jumlah')
                ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->readOnly()
                ->reactive(),
              TextInput::make('jumlah_kekurangan')
                ->label('Kekurangan')
                ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->readOnly()
                ->reactive()
                ->extraAttributes([
                  'style' => 'background-color: rgb(248 113 113 / 50%);', // Set background color
                ])
                ->visible(fn(callable $get) => $get('jumlah_kekurangan_visible') ?? false),
            ]),
        ])
        ->extraAttributes([
          'style' => 'background-color: #d9770885', // Customize the background color and add padding and border-radius
        ]),
    ]);
  }

  public function table(Table $table): Table
  {
    return $table
      ->recordTitleAttribute('id')
      ->heading('Riwayat Transaksi')
      // ->description('Waktu Sisa Kontrak .. Hari')
      ->columns([
        TextColumn::make('created_at')
          ->label('Tanggal Dibuat')
          ->formatStateUsing(function ($state) {
            return \Carbon\Carbon::parse($state)->locale('id')->translatedFormat('d F Y');
          }),
        TextColumn::make('tipe_pembayaran')
          ->label('Mulai s/d Berakhir')
          ->formatStateUsing(function ($record) {
            $start = \Carbon\Carbon::parse($record->tanggal)
              ->locale('id')
              ->translatedFormat('d F Y');
            $end = \Carbon\Carbon::parse($record->tgl_pembayaran_berikutnya)
              ->locale('id')
              ->translatedFormat('d F Y');
            return "{$record->tipe_pembayaran} Bulan <br/>({$start} s/d {$end})";
          })
          ->html(),
        TextColumn::make('jumlah_pemasukan')
          ->label('Jumal Pembayaran')
          ->getStateUsing(function (Transaksi $record) {
            $amount = $record->jumlah_pemasukan;
            if ($amount == 0) {
              return '<span>-</span>';
            }
            $style = 'color: rgb(74, 222, 128);';
            return "<span style=\"$style\">Rp " . number_format($amount, 0, ',', '.') . '</span>';
          })
          ->html(),
        TextColumn::make('status_pembayaran')
          ->formatStateUsing(function ($state) {
            // Define the color and text for each status
            $statusLabels = [
              'tertunda' => 'Belum Lunas',
              'dibayar' => 'Lunas',
              'gagal' => 'Gagal',
              'dikembalikan' => 'Dikembalikan',
            ];

            $statusText = $statusLabels[$state] ?? $state;

            // Define colors based on the status
            $statusColors = [
              'Lunas' => 'color: rgb(74, 222, 128);', // Green for 'Lunas'
              'Belum Lunas' => 'color: rgb(248, 113, 113);', // Red for 'Belum Lunas'
              'Gagal' => 'color: rgb(248, 113, 113);', // Red for 'Gagal'
              'Dikembalikan' => 'color: rgb(248, 113, 113);', // Red for 'Dikembalikan'
            ];

            // Use the color for the status
            $colorStyle = $statusColors[$statusText] ?? 'color: black;';

            return "<span style=\"$colorStyle\">$statusText</span>";
          })
          ->html(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        // Define filters if needed
      ])
      ->headerActions([
        Tables\Actions\CreateAction::make()
          ->label('Perpanjang')
          ->modalHeading('Perpanjang Kontrak')
          ->disableCreateAnother()
          ->slideOver()
          ->modalWidth(MaxWidth::FiveExtraLarge),
      ])
      ->actions([
        Tables\Actions\ViewAction::make()
          ->iconButton()
          ->modalHeading(
            fn($record) => 'Transaksi dari ' . $record->penyewa->nama ?? 'Unknown Penyewa'
          )
          ->slideOver()
          ->modalWidth(MaxWidth::FiveExtraLarge),
        Tables\Actions\EditAction::make()
          ->iconButton()
          ->modalHeading(
            fn($record) => 'Transaksi dari ' . $record->penyewa->nama ?? 'Unknown Penyewa'
          )
          ->slideOver()
          ->modalWidth(MaxWidth::FiveExtraLarge),
      ])
      ->bulkActions([
        // Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
      ]);
  }
}
