<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PelangganResource\Pages;
use App\Filament\Resources\PelangganResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\{TextColumn};
use Filament\Forms\Components\{TextInput, PasswordInput, Grid};

class PelangganResource extends Resource
{
  protected static ?string $model = User::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  public static function form(Form $form): Form
  {
    return $form->schema([
        Grid::make(1) // Membuat grid dengan 2 kolom
        ->schema([
            TextInput::make('name')->label('Nama')->autocomplete(false)->required(),
            TextInput::make('email')->email()->autocomplete(false)->required()->unique(ignoreRecord: true),
            TextInput::make('password')->password()->autocomplete(false)->required()->dehydrateStateUsing(fn ($state) => bcrypt($state)),
        ]),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        //
        TextColumn::make('name')->label('Nama')->searchable(),
        TextColumn::make('email')->searchable(),
        TextColumn::make('roles.name')->label('Role'),
        TextColumn::make('created_at')->label('Register pada')->dateTime(),
      ])
      ->filters([
        //
      ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
      ]);
  }

  public static function afterSave($record): void
{
    if (!$record->hasRole('pelanggan')) {
        $record->assignRole('pelanggan');
    }
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
      'index' => Pages\ListPelanggans::route('/'),
      'create' => Pages\CreatePelanggan::route('/create'),
      'edit' => Pages\EditPelanggan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Data Pelanggan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Manajemen Keanggotaan');
  }
}
