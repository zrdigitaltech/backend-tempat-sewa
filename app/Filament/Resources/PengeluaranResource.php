<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PengeluaranResource\Pages;
use App\Filament\Resources\PengeluaranResource\RelationManagers;
use App\Models\Kontrakan;
use App\Models\Kategori;
use App\Models\Pengeluaran;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Forms\Components\{Card, TextInput, DatePicker, Select, Textarea};
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

class PengeluaranResource extends Resource
{
  protected static ?string $model = Pengeluaran::class;
  protected static ?string $navigationIcon = 'heroicon-o-credit-card';
  protected static ?int $navigationSort = 5;
  // protected static ?string $navigationLabel = 'Pengeluaran';
  // protected static ?string $label = 'pengeluaran';
  protected static ?string $slug = 'pengeluaran';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          DatePicker::make('tanggal')
            ->required()
            ->label('Tanggal')
            ->default(Carbon::now()->format('Y-m-d')),

          Select::make('id_kontrakan')
            ->options(function () {
              return Kontrakan::all()->pluck('nama', 'id')->toArray();
            })
            // ->searchable()
            ->label('Nama Kontrakan'),

          Select::make('id_kategori')
            ->options(function () {
              return Kategori::all()->pluck('nama', 'id')->toArray();
            })
            // ->searchable()
            ->createOptionUsing(function ($data) {
              $kategori = Kategori::create([
                'nama' => $data['nama'], // Adjust based on your input form structure
              ]);
              return $kategori->id; // Return the ID of the newly created category
            })
            ->createOptionForm(
              fn(Form $form) => $form->schema([
                TextInput::make('nama')->required()->label('Nama Kategori'),
              ])
            )
            ->label('Nama Kategori')
            ->required(),

          Textarea::make('keterangan')->label('Keterangan'),

          TextInput::make('jumlah_pengeluaran')
            ->label('Jumlah Pengeluaran')
            ->numeric()
            ->required()
            ->mask(RawJs::make('$money($input)'))
            ->stripCharacters(','),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('tanggal')
          ->label('Tanggal')
          ->formatStateUsing(function ($state) {
            return \Carbon\Carbon::parse($state)->locale('id')->translatedFormat('d F Y');
          })
          ->sortable(),
        TextColumn::make('kontrakan.nama')->label('Nama Kontrakan')->limit(15)//   ->searchable()
        ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        TextColumn::make('kategori.nama')
          ->label('Nama Kategori')
          ->limit(15)
          ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        TextColumn::make('keterangan')
          ->label('Keterangan')
          ->limit(15)
          ->tooltip(fn($state) => strlen($state) > 15 ? $state : null),
        TextColumn::make('jumlah_pengeluaran')->label('Jumlah Pengeluaran'),
        TextColumn::make('jumlah_pengeluaran')
          ->label('Jumlah Pengeluaran')
          ->getStateUsing(function (Pengeluaran $record) {
            // Format the total as an integer with dot separators
            return 'Rp ' . number_format($record->jumlah_pengeluaran, 0, ',', '.');
          })
          ->html(),
      ])
      ->defaultSort('created_at', 'desc')
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
                ->placeholder('Cari')
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
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          // CreateAction::make()->createAnother(false),
        ]),
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
      'index' => Pages\ListPengeluarans::route('/'),
      'create' => Pages\CreatePengeluaran::route('/create'),
      'edit' => Pages\EditPengeluaran::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Pengeluaran');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Pengelolaan');
  }

  public static function getNavigationLabelForKeuangan(): string
  {
    return __('Keuangan');
  }
}
