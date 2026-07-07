<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaketKeanggotaanResource\Pages;
use App\Filament\Resources\PaketKeanggotaanResource\RelationManagers;
use App\Models\PaketKeanggotaan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\RawJs;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\{
  ViewAction,
  EditAction,
  DeleteAction,
  BulkActionGroup,
  DeleteBulkAction
};
use App\Models\User;

class PaketKeanggotaanResource extends Resource
{
  protected static ?string $model = PaketKeanggotaan::class;

  protected static ?string $navigationIcon = 'heroicon-o-archive-box';
    protected static ?string $slug = 'paket-keanggotaan';
    protected static ?string $navigationGroup = 'Manajemen Pengguna';
  protected static ?int $navigationSort = 0;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make('nama')->required()->maxLength(255),
      Forms\Components\Textarea::make('deskripsi')->nullable(),
      Forms\Components\TextInput::make('harga')
        ->label('Harga')
        ->numeric()
        ->required()
        ->mask(RawJs::make('$money($input)'))
        ->stripCharacters(',')
        ->prefix('Rp'),
      Forms\Components\TextInput::make('durasi_bulan')
        ->numeric()
        ->required()
        ->label('Durasi (Bulan)'),
      Forms\Components\TextInput::make('maksimal_properti')
        ->label('Maksimal Properti')
        ->numeric()
        ->nullable(),

      Forms\Components\TextInput::make('maksimal_iklan')
        ->label('Maksimal Iklan')
        ->numeric()
        ->nullable(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('nama'),
        TextColumn::make('deskripsi')->limit(50)->toggleable()->toggledHiddenByDefault(),
        TextColumn::make('harga')->money('IDR'), // Format as Indonesian Rupiah
        TextColumn::make('durasi_bulan')->label('Durasi (Bulan)'),
        TextColumn::make('maksimal_properti')->label('Maks. Properti'),

        TextColumn::make('maksimal_iklan')->label('Maks. Iklan'),
        TextColumn::make('created_at')
          ->dateTime()
          ->label('Dibuat Pada')
          ->toggleable()
          ->toggledHiddenByDefault(),

        TextColumn::make('createdBy.name')
          ->label('Dibuat Oleh')
          ->toggleable()
          ->toggledHiddenByDefault(),

        TextColumn::make('updatedBy.name')
          ->label('Diperbarui Oleh')
          ->toggleable()
          ->toggledHiddenByDefault(),
      ])
      ->filters([
        //
      ])
      ->striped()
      ->actions([
        ViewAction::make()->iconButton()->tooltip('Lihat detail'),
        EditAction::make()->iconButton()->tooltip('Ubah'),
        DeleteAction::make()->iconButton()->tooltip('Hapus'),
      ])
      ->bulkActions([
        // Tables\Actions\BulkActionGroup::make([
        //   Tables\Actions\DeleteBulkAction::make()
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
      'index' => Pages\ListPaketKeanggotaans::route('/'),
      'create' => Pages\CreatePaketKeanggotaan::route('/create'),
      'edit' => Pages\EditPaketKeanggotaan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Paket Keanggotaan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Keanggotaan');
  }
}
