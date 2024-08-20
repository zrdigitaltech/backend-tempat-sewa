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

class PengeluaranResource extends Resource
{
  protected static ?string $model = Pengeluaran::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  protected static ?int $navigationSort = 5;

  protected static ?string $navigationLabel = 'Pengeluaran';

  protected static ?string $label = 'pengeluaran';

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
            ->searchable()
            ->label('Nama Kontrakan'),

          Select::make('id_kategori')
            ->options(function () {
              return Kategori::all()->pluck('nama', 'id')->toArray();
            })
            ->searchable()
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

          TextInput::make('jumlah_pengeluaran')->required()->numeric()->label('Jumlah Pengeluaran'),
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
        TextColumn::make('kontrakan.nama')->label('Nama Kontrakan')->limit(15)->searchable(),
        TextColumn::make('kategori.nama')->label('Nama Kategori')->limit(15),
        TextColumn::make('keterangan')->label('Keterangan'),
        TextColumn::make('jumlah_pengeluaran')->label('Jumlah Pengeluaran'),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        

        SelectFilter::make('id_kategori')
          ->label('Nama Kategori')
          ->options(function () {
            return Kategori::all()->pluck('nama', 'id')->toArray();
          }),
      ])
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
}
