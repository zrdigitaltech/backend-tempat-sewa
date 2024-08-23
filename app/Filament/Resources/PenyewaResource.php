<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PenyewaResource\Pages;
use App\Filament\Resources\PenyewaResource\Pages\RiwayatTransaksi;
use App\Filament\Resources\PenyewaResource\RelationManagers;
use App\Models\Penyewa;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Forms\Components\{DatePicker, Section, Grid, FileUpload, TextInput, TextArea, Select};
use Carbon\Carbon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;
use App\Models\Kontrakan;
use Filament\Support\RawJs;

use Filament\Resources\Pages\Page;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Actions\ActionGroup;
use Filament\Forms\Components\Placeholder;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Log;

class PenyewaResource extends Resource
{
  protected static ?string $model = Penyewa::class;
  protected static ?string $navigationIcon = 'heroicon-o-identification';
  protected static ?int $navigationSort = 1;
  // protected static ?string $navigationLabel = 'Data Penyewa';
  // protected static ?string $label = 'Data Penyewa';
  protected static ?string $slug = 'data-penyewa';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Section::make('Penyewa') // Membuat judul untuk section
        ->schema([
          Grid::make(2) // Membuat grid dengan 2 kolom
            ->schema([
              TextInput::make('nama')
                ->maxLength(255)
                ->required()
                ->autocomplete('off')
                ->unique(ignoreRecord: true)
                ->disabled(
                  fn(Page $livewire) => $livewire instanceof
                    \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
                ),
              TextInput::make('no_telp')
                ->label('No Whatsapp')
                ->unique(ignoreRecord: true)
                ->required()
                ->tel()
                ->maxLength(15)
                ->autocomplete('off')
                ->telRegex('/^08[0-9]{8,11}$/')
                ->placeholder('08xxxxxxxxxx')
                ->helperText(
                  'Masukkan nomor whatsapp dengan format 08 diikuti oleh 8-11 digit angka.'
                )
                ->disabled(
                  fn(Page $livewire) => $livewire instanceof
                    \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
                ),

              FileUpload::make('image')
                ->label('Foto Penyewa')
                ->acceptedFileTypes(['image/*'])
                ->disabled(
                  fn(Page $livewire) => $livewire instanceof
                    \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
                ),

              FileUpload::make('kartu_identitas')
                ->label('Kartu Identitas')
                ->required()
                ->acceptedFileTypes(['image/*'])
                ->disabled(
                  fn(Page $livewire) => $livewire instanceof
                    \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
                ),
            ]),
        ])
        ->collapsed(
          fn(Page $livewire) => $livewire instanceof
            \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
        ),

      Section::make('') // Membuat judul untuk section
        ->schema([
          Grid::make(1)->schema([
            Placeholder::make('')->content(function ($record) {
              // Fetch the latest transaction for the penyewa
              $latestTransaction = $record?->transaksis()->latest()->first();

              // Check if the latest transaction exists and has a valid date
              if ($latestTransaction && $latestTransaction->tgl_pembayaran_berikutnya) {
                // Get the current date
                $today = Carbon::now()->startOfDay(); // Ensure we're comparing full days

                // Get the 'tgl_pembayaran_berikutnya' from the latest transaction
                $nextPaymentDate = Carbon::parse(
                  $latestTransaction->tgl_pembayaran_berikutnya
                )->startOfDay();

                // Calculate the difference in days
                $daysRemaining = $today->diffInDays($nextPaymentDate, false); // false to allow negative numbers

                // Determine font color and message based on days remaining
                if ($daysRemaining < 0) {
                  $message =
                    'Jatuh tempo telah lewat <b>' .
                    abs($daysRemaining) .
                    ' Hari</b>, waktunya bayar perpanjang.';
                  $fontColor = 'color: rgb(248, 113, 113);';
                } elseif ($daysRemaining < 7) {
                  $message = "Sisa Kontrak <b>{$daysRemaining} Hari</b>, waktunya bayar perpanjang.";
                  $fontColor = 'color: rgb(248, 113, 113);';
                } else {
                  $message = "Sisa Kontrak <b>{$daysRemaining} Hari</b>.";
                  $fontColor = '';
                }

                // Return HTML content with inline styling
                return new HtmlString("<span style='{$fontColor}'>{$message}</span>");
              } else {
                // Return a default value or message when 'tgl_pembayaran_berikutnya' is null
                return new HtmlString('<span>Tanggal tidak tersedia</span>');
              }
            }),
          ]),
        ])
        ->visible(
          fn(Page $livewire) => $livewire instanceof
            \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
        ),

      Section::make('Unit Sewa') // Membuat judul untuk section
        ->schema([
          Grid::make(2) // Membuat grid dengan 2 kolom
            ->schema([
              Select::make('id_kontrakan')
                ->label('Nama Kontrakan')
                ->options(function () {
                  return Kontrakan::where('status', 'tersedia')->pluck('nama', 'id')->toArray();

                  // Check if options are empty
                  if (empty($kontrakans)) {
                    return ['' => 'Tidak ada kontrakan tersedia'];
                  }

                  return $kontrakans;
                })
                ->required()
                ->searchable(function () {
                  return Kontrakan::where('status', 'tersedia')->exists();
                })
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
        ])
        ->visibleOn('create')
        ->collapsed(
          fn(Page $livewire) => $livewire instanceof
            \App\Filament\Resources\PenyewaResource\Pages\ViewPenyewa
        ),

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
                ->visible(fn(callable $get) => $get('bayar_dp_visible')),
              TextInput::make('jumlah_pemasukan')
                ->label('Jumlah')
                // ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->readOnly()
                ->reactive(),
              TextInput::make('jumlah_kekurangan')
                ->label('Kekurangan')
                // ->numeric()
                ->mask(RawJs::make('$money($input)'))
                ->stripCharacters(',')
                ->prefix('Rp')
                ->readOnly()
                ->reactive()
                ->extraAttributes([
                  'style' => 'background-color: rgb(248 113 113 / 50%);', // Set background color
                ])
                ->visible(fn(callable $get) => $get('jumlah_kekurangan_visible')),
            ]),
        ])
        ->extraAttributes([
          'style' => 'background-color: #d9770885', // Customize the background color and add padding and border-radius
        ])
        ->visibleOn('create'),
    ]);
  }
  // ->grow(false)
  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        // Text::make('email')->url(fn ($customer) => "mailto:{$customer->email}"),
        TextColumn::make('kontak_info')
          ->label('Info Kontak')
          ->getStateUsing(function ($record) {
            // Generate HTML for the image
            $imageHtml = $record->image
              ? '<img src="/storage/' .
                htmlspecialchars($record->image) .
                '" alt="Image" style="height: 3rem; width: 3rem; display: block;border-radius: 9999px;object-position: center;
    object-fit: cover;"/>'
              : '';

            // Escape and prepare 'nama' and 'no_telp'
            $nama = htmlspecialchars($record->nama);
            $noTelp = htmlspecialchars($record->no_telp);

            // Combine the image and text in a horizontal layout
            return '<div style="display: flex; align-items: center;">
                        <div style="flex: 0 0 auto; margin-right: 10px;">
                            ' .
              $imageHtml .
              '
                        </div>
                        <div style="flex: 1;">
                            <div style="text-transform: capitalize;;">' .
              $nama .
              '</div>
                            <div>' .
              $noTelp .
              '</div>
                        </div>
                    </div>';
          })
          ->html(),
        TextColumn::make('kontrakan_nama')
          ->label('Nama Kontrakan')
          ->words(2)
          ->getStateUsing(function ($record) {
            // Fetch the latest transaction for the record
            $latestTransaction = $record->transaksis()->latest()->first();

            // Check if the latest transaction exists and has a related kontrakan
            if ($latestTransaction && $latestTransaction->kontrakan) {
              // Return the name of the kontrakan
              return $latestTransaction->kontrakan->nama;
            } else {
              // Handle the case where there is no related kontrakan
              return 'Kontrakan tidak tersedia';
            }
          })
          ->html(),
        TextColumn::make('sisa')
          ->label('')
          ->getStateUsing(function ($record) {
            // Fetch the latest transaction for the penyewa
            $latestTransaction = $record->transaksis()->latest()->first();

            // Check if the latest transaction exists and has a valid date
            if ($latestTransaction && $latestTransaction->tgl_pembayaran_berikutnya) {
              // Get the current date
              $today = Carbon::now()->startOfDay(); // Ensure we're comparing full days

              // Get the 'tgl_pembayaran_berikutnya' from the latest transaction
              $nextPaymentDate = Carbon::parse(
                $latestTransaction->tgl_pembayaran_berikutnya
              )->startOfDay();

              // Calculate the difference in days
              $daysRemaining = $today->diffInDays($nextPaymentDate, false); // false to allow negative numbers

              // Format the output based on the number of days remaining
              if ($daysRemaining < 0) {
                // Show the number of overdue days without the negative sign
                return "<span style='color: rgb(248, 113, 113);'>Jatuh tempo telah lewat <b>" .
                  abs($daysRemaining) .
                  ' Hari</b><br>waktunya bayar perpanjang</span>';
              } elseif ($daysRemaining <= 7) {
                return "<span style='color: rgb(248, 113, 113);'>Sisa Kontrak <b>{$daysRemaining} Hari</b><br>waktunya bayar perpanjang</span>";
              } else {
                return "Sisa Kontrak <b>{$daysRemaining} Hari</b>";
              }
            } else {
              // Return a default value or message when 'tgl_pembayaran_berikutnya' is null
              return 'Tanggal tidak tersedia';
            }
          })
          ->html(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters(
        [
          Filter::make('search')
            ->label('Cari')
            ->form([
              TextInput::make('search')
                ->label('')

                ->autocomplete(false)
                ->placeholder('Cari berdasarkan Nama & No Whatsapp')
                ->reactive(),
            ])
            ->query(function ($query, $data) {
              return $query->when($data['search'], function ($query, $term) {
                $query->where(function ($query) use ($term) {
                  $query
                    ->where('nama', 'like', "%{$term}%")
                    ->orWhere('no_telp', 'like', "%{$term}%");
                });
              });
            })
            ->indicateUsing(function ($data) {
              return $data['search'] ? 'Mencari: ' . $data['search'] : null;
            }),
        ],
        layout: FiltersLayout::AboveContentCollapsible
      )
      ->filtersFormColumns(1) // Display filters in 2 columns
      ->filtersFormSchema(fn(array $filters): array => [$filters['search']])
      ->actions([
        ActionGroup::make([
          ViewAction::make()->icon('heroicon-o-document-text')->label('Lihat Riwayat Transaksi'),
          CreateAction::make()->icon('heroicon-o-arrow-path')->label('Perpanjang')->modal(),
          ViewAction::make()->icon('heroicon-o-arrows-right-left')->label('Pindah'),
          ViewAction::make()->icon('heroicon-o-arrow-left-start-on-rectangle')->label('Keluar'),
        ])
          ->iconButton()
          ->tooltip('Lihat Riwayat Transaksi'),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          CreateAction::make()->createAnother(false),
        ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [RelationManagers\TransaksiRelationManager::class];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListPenyewas::route('/'),
      'create' => Pages\CreatePenyewa::route('/create'),
      'edit' => Pages\EditPenyewa::route('/{record}/edit'),
      'view' => Pages\ViewPenyewa::route('/{record}/view'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Data Penyewa');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Pengelolaan');
  }
}
