<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LayananKeanggotaanResource\Pages;
use App\Filament\Resources\LayananKeanggotaanResource\RelationManagers;
use App\Models\Membership;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class LayananKeanggotaanResource extends Resource
{
  protected static ?string $model = Membership::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

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
      ->actions([Tables\Actions\EditAction::make()])
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
      'index' => Pages\ListLayananKeanggotaans::route('/'),
      'create' => Pages\CreateLayananKeanggotaan::route('/create'),
      'edit' => Pages\EditLayananKeanggotaan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Data Layanan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Manajemen Keanggotaan');
  }
}
