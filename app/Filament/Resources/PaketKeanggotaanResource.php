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

class PaketKeanggotaanResource extends Resource
{
  protected static ?string $model = PaketKeanggotaan::class;

  protected static ?string $navigationIcon = 'heroicon-o-archive-box';
  protected static ?string $slug = 'paket-keanggotaan';
  protected static ?int $navigationSort = 0;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\TextInput::make('nama')->required()->maxLength(255),
      Forms\Components\Textarea::make('deskripsi')->nullable(),
      Forms\Components\TextInput::make('harga')->numeric()->required(),
      Forms\Components\TextInput::make('durasi_bulan')
        ->numeric()
        ->required()
        ->label('Durasi (Bulan)'),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('nama')->sortable()->searchable(),
        Tables\Columns\TextColumn::make('deskripsi')->limit(50)->toggleable(),
        Tables\Columns\TextColumn::make('harga')->money('IDR'), // Format as Indonesian Rupiah
        Tables\Columns\TextColumn::make('durasi_bulan')->label('Durasi (Bulan)'),
        Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Dibuat Pada'),
      ])
      ->filters([
        //
      ])
      ->striped()
      ->actions([Tables\Actions\EditAction::make()->iconButton()])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
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
    return __('Manajemen Keanggotaan');
  }
}
