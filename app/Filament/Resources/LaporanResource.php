<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LaporanResource\Pages;
use App\Filament\Resources\LaporanResource\RelationManagers;
use App\Models\Kontrakan;
use App\Models\Kategori;
use App\Models\Penyewa;
use App\Models\Transaksi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Forms\Components\{Card, TextInput, DatePicker, Hidden, Select, Textarea};
use Filament\Tables\Columns\{TextColumn};
use Filament\Tables\Actions\{
  ViewAction,
  EditAction,
  DeleteAction,
  BulkActionGroup,
  DeleteBulkAction,
  CreateAction
};
use Carbon\Carbon;
use Filament\Tables\Filters\SelectFilter;
use Filament\Support\RawJs;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Forms\Components\Button;
use Filament\Notifications\Notification;
use Filament\Forms\Components\Actions\Action;
use Filament\Tables\Columns\Summarizers\Sum;
use Illuminate\Support\HtmlString;
use Filament\Tables\Enums\ActionsPosition;
use Filament\Tables\Actions\ActionGroup;

class LaporanResource extends Resource
{
  protected static ?string $model = Transaksi::class;
  protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
  protected static ?int $navigationSort = 5;
  protected static ?string $slug = 'laporan';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          Select::make('status_pembayaran')
            ->options([
              'tertunda' => 'Belum Lunas',
              'dibayar' => 'Lunas',
              'gagal' => 'Gagal',
              'dikembalikan' => 'Dikembalikan',
            ])
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),
          Select::make('id_kontrakan')
            ->options(function () {
              return Kontrakan::all()->pluck('nama', 'id')->toArray();
            })
            ->label('Nama Kontrakan')
            ->required()
            ->searchable()
            ->preload()
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),
          Select::make('id_penyewa')
            ->options(function () {
              return Penyewa::all()->pluck('nama', 'id')->toArray();
            })
            ->label('Nama Penyewa')
            ->required()
            ->searchable()
            ->preload()
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),
          Select::make('tipe_pembayaran')
            ->options(function (callable $get) {
              $idKontrakan = $get('id_kontrakan');

              // Jika 'id_kontrakan' belum dipilih, kembalikan array kosong
              if (!$idKontrakan) {
                return [];
              }

              // Temukan kontrakan berdasarkan ID
              $kontrakan = Kontrakan::find($idKontrakan);

              // Buat opsi berdasarkan harga_sewa
              $options = [];
              if ($kontrakan) {
                foreach ($kontrakan->harga_sewa as $item) {
                  $durasi = $item['durasi'];
                  $harga = $item['harga'];
                  // Tambahkan opsi dengan format: "durasi bulan - Rp harga"
                  $options[$durasi] = "{$durasi} Bulan - Rp " . number_format($harga, 0, ',', '.');
                }
              }

              return $options;
            })
            ->label('Tipe Pembyaran')
            ->required()
            ->searchable()
            ->preload()
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),

          DatePicker::make('tanggal')
            ->required()
            ->label('Tanggal Mulai')
            ->default(Carbon::now()->format('Y-m-d'))
            ->native(false)
            ->displayFormat('d F Y')
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),
          DatePicker::make('tgl_pembayaran_berikutnya')
            ->label('Tanggal Pembayaran Berikutnya')
            ->native(false)
            ->displayFormat('d F Y')
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),
          TextInput::make('bayar_dp')
            ->label('Bayar DP')
            ->numeric()
            ->required()
            ->mask(RawJs::make('$money($input)'))
            ->stripCharacters(',')
            ->prefix('Rp')
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),

          // Start Pengeluaran
          DatePicker::make('tanggal')
            ->required()
            ->label('Tanggal')
            ->default(Carbon::now()->format('Y-m-d'))
            ->native(
              fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord ||
                $livewire instanceof \Filament\Resources\Pages\CreateRecord
            )
            ->displayFormat(
              fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord ||
              $livewire instanceof \Filament\Resources\Pages\CreateRecord
                ? 'Y-m-d'
                : 'd F Y'
            )
            ->hidden(
              fn($record) => $record?->jumlah_pemasukan === null ? false : $record->jumlah_pemasukan
            ),

          Select::make('id_kontrakan')
            ->options(function () {
              return Kontrakan::all()->pluck('nama', 'id')->toArray();
            })
            ->label('Nama Kontrakan')
            ->required()
            ->searchable()
            ->preload()
            ->hidden(fn($record) => $record?->jumlah_pemasukan),

          Select::make('id_kategori')
            ->options(function () {
              return Kategori::all()->pluck('nama', 'id')->toArray();
            })
            ->searchable()
            ->preload()
            ->createOptionUsing(function ($data) {
              // Check if the category already exists
              $existingKategori = Kategori::where('nama', $data['nama'])->first();
              if ($existingKategori) {
                return $existingKategori->id; // Return the existing category ID
              }

              // Create a new category if it doesn't exist
              $kategori = Kategori::create([
                'nama' => $data['nama'],
              ]);
              return $kategori->id; // Return the ID of the newly created category
            })
            ->createOptionForm(
              fn(Form $form) => $form->schema([
                TextInput::make('nama')
                  ->unique(ignoreRecord: true)
                  ->required()
                  ->label('Nama Kategori')
                  ->autocomplete('off'),
              ])
            )
            ->relationship(name: 'kategori', titleAttribute: 'nama')
            ->editOptionForm(
              fn(Form $form) => $form->schema([
                TextInput::make('nama')
                  ->unique(ignoreRecord: true)
                  ->required()
                  ->label('Nama Kategori')
                  ->autocomplete('off'),
              ])
            )
            ->label('Nama Kategori')
            ->required()
            ->hidden(fn($record) => $record?->jumlah_pemasukan),

          TextInput::make('jumlah_pemasukan')
            ->label('Jumlah Pemasukan')
            ->numeric()
            ->required()
            ->mask(RawJs::make('$money($input)'))
            ->stripCharacters(',')
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran)
            ->prefix('Rp')
            ->autocomplete('off'),

          Textarea::make('catatan')
            ->label('Keterangan')
            ->nullable()
            ->hidden(fn($record) => $record?->jumlah_pemasukan),

          Textarea::make('catatan')
            ->label('Catatan')
            ->nullable()
            ->hidden(fn($record) => $record === null ? true : $record->jumlah_pengeluaran),

          TextInput::make('jumlah_pengeluaran')
            ->label('Jumlah Pengeluaran')
            ->numeric()
            ->required()
            ->mask(RawJs::make('$money($input)'))
            ->stripCharacters(',')
            ->hidden(fn($record) => $record?->jumlah_pemasukan)
            ->prefix('Rp')
            ->autocomplete('off'),
          // End Pengeluaran

          // Select::make('jenis_transaksi')
          //   ->label('Jenis Transaksi')
          //   ->options([
          //     'pemasukan' => 'Pemasukan',
          //     'pengeluaran' => 'Pengeluaran',
          //   ])
          //   ->default('pengeluaran')
          //   ->disableOptionWhen(fn(string $value): bool => $value === 'pemasukan')
          //   ->selectablePlaceholder(false)
          //   ->rules(['required']),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('tanggal')
          ->label('Tanggal Mulai')
          ->formatStateUsing(function ($state) {
            return \Carbon\Carbon::parse($state)->locale('id')->translatedFormat('d F Y');
          })
          ->sortable(),
        TextColumn::make('tgl_pembayaran_berikutnya')
          ->label('Tanggal P. Berikutnya')
          ->getStateUsing(function (Transaksi $record) {
            return $record->tgl_pembayaran_berikutnya ? $record->tgl_pembayaran_berikutnya : '-';
          })
          ->formatStateUsing(function ($state) {
            if ($state === '-') {
              return '<div style="text-align: center;">' . $state . '</div>';
            }
            return \Carbon\Carbon::parse($state)->locale('id')->translatedFormat('d F Y');
          })
          ->html(),
        TextColumn::make('penyewa.nama')
          ->label('Nama Penyewa')
          ->getStateUsing(function (Transaksi $record) {
            return $record->penyewa ? $record->penyewa->nama : '-';
          })
          ->limit(15)
          ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        TextColumn::make('kontrakan.nama')
          ->label('Nama Kontrakan')
          ->limit(15)
          ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        TextColumn::make('jumlah_pemasukan')
          ->label('Pemasukan')
          ->getStateUsing(function (Transaksi $record) {
            $amount = $record->jumlah_pemasukan;
            if ($amount == 0) {
              return '<span>-</span>';
            }
            $style = 'color: rgb(74, 222, 128);';
            return "<span style=\"$style\">Rp " . number_format($amount, 0, ',', '.') . '</span>';
          })
          ->html()
          ->summarize(Sum::make()->label('Jumlah')->prefix('Rp. ')),
        TextColumn::make('jumlah_pengeluaran')
          ->label('Pengeluaran')
          ->getStateUsing(function (Transaksi $record) {
            $amount = $record->jumlah_pengeluaran;

            // If amount is 0, return a dash. Otherwise, format the amount with styling.
            if ($amount == 0) {
              return '<span>-</span>';
            }

            // Apply style only if the amount is greater than 0
            $style = 'color: rgb(248, 113, 113);';

            return "<span style=\"$style\">Rp " . number_format($amount, 0, ',', '.') . '</span>';
          })
          ->html()
          ->summarize(Sum::make()->label('Jumlah')->prefix('Rp. ')),
      ])
      // ->recordClasses(fn ($record) => $record->jumlah_pengeluaran > $record->jumlah_pemasukan ? 'bg-danger' : 'bg-success')

      ->defaultSort('created_at', 'desc')
      ->recordUrl(null)
      ->striped()
      ->filters(
        [
          Filter::make('tanggal')
            ->label('Tanggal')
            ->form([
              Select::make('date_filter')
                ->label('Tanggal')
                ->options([
                  'last_30_days' => '30 Hari Terakhir',
                  'last_month' => 'Bulan Lalu',
                  'this_month' => 'Bulan Ini',
                  'previous_30_days' => '30 Hari Sebelumnya',
                ])
                ->reactive()
                ->afterStateUpdated(function ($state) use ($table) {
                  $query = $table->getQuery();
                  if ($state) {
                    switch ($state) {
                      case 'last_30_days':
                        $query->whereBetween('tanggal', [
                          Carbon::now()->subDays(30)->startOfDay(),
                          Carbon::now()->endOfDay(),
                        ]);
                        break;
                      case 'last_month':
                        $query
                          ->whereMonth('tanggal', Carbon::now()->subMonth()->month)
                          ->whereYear('tanggal', Carbon::now()->year);
                        break;
                      case 'this_month':
                        $query
                          ->whereMonth('tanggal', Carbon::now()->month)
                          ->whereYear('tanggal', Carbon::now()->year);
                        break;
                      case 'previous_30_days':
                        $query->whereBetween('tanggal', [
                          Carbon::now()->subDays(60)->startOfDay(),
                          Carbon::now()->subDays(31)->endOfDay(),
                        ]);
                        break;
                    }
                  }
                  $table->query($query);
                }),
            ]),
          Filter::make('search')
            ->label('Cari')
            ->form([
              TextInput::make('search')
                ->label('Nama Kontrakan')
                ->placeholder('Cari berdasarkan Nama Kontrakan')
                ->reactive()
                ->afterStateUpdated(function ($state) use ($table) {
                  $query = $table->getQuery();
                  if ($state) {
                    $query->whereHas('kontrakan', function ($query) use ($state) {
                      $query->where('nama', 'like', "%{$state}%");
                    });
                  }
                  $table->query($query);
                }),
            ]),
          SelectFilter::make('id_kategori')
            ->label('Nama Kategori')
            ->options(function () {
              return Kategori::all()->pluck('nama', 'id')->toArray();
            }),
        ],
        layout: FiltersLayout::AboveContentCollapsible
      )
      ->filtersFormColumns(3) // Display filters in 2 columns
      ->filtersFormSchema(
        fn(array $filters): array => [
          $filters['tanggal'],
          $filters['search'],
          $filters['id_kategori'],
        ]
      )
      ->actions([
        ActionGroup::make([
          ViewAction::make(),

          EditAction::make()->hidden(fn($record) => $record->jumlah_pemasukan),

          DeleteAction::make()->hidden(fn($record) => $record->jumlah_pemasukan),
        ])->iconButton(),
      ])
      ->bulkActions([
        // BulkActionGroup::make([
        //   DeleteBulkAction::make(),
        //   // CreateAction::make()->createAnother(false),
        // ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListLaporans::route('/'),
      'create' => Pages\CreateLaporan::route('/create-expenses'),
      'edit' => Pages\EditLaporan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Laporan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Manajemen Properti');
  }
}
