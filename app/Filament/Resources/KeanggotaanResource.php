<?php

namespace App\Filament\Resources;

use App\Models\Keanggotaan;
use App\Models\User;
use App\Models\PaketKeanggotaan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use App\Filament\Resources\KeanggotaanResource\Pages;
use Illuminate\Database\Eloquent\Builder;

class KeanggotaanResource extends Resource
{
  protected static ?string $model = Keanggotaan::class;

  protected static ?string $navigationIcon = 'heroicon-o-identification';
  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\Select::make('id_user')
        ->label('User')
        ->relationship('user', 'name')
        ->searchable()
        ->required(),

      Forms\Components\Select::make('id_paketkeanggotaan')
        ->label('Paket Keanggotaan')
        ->relationship('paket', 'nama')
        ->searchable()
        ->required(),

      Forms\Components\DatePicker::make('tanggal_mulai')->label('Tanggal Mulai')->required(),

      Forms\Components\DatePicker::make('tanggal_berakhir')->label('Tanggal Berakhir')->required(),

      Forms\Components\Toggle::make('aktif')->label('Status Aktif')->default(true),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        Tables\Columns\TextColumn::make('user.name')->label('Nama User')->searchable()->sortable(),

        Tables\Columns\TextColumn::make('paket.nama')->label('Paket')->searchable()->sortable(),

        Tables\Columns\TextColumn::make('tanggal_mulai')->label('Mulai')->date()->sortable(),

        Tables\Columns\TextColumn::make('tanggal_berakhir')->label('Berakhir')->date()->sortable(),

        Tables\Columns\IconColumn::make('aktif')->boolean()->label('Aktif'),
      ])
      ->filters([
        //
      ])
      ->actions([Tables\Actions\ViewAction::make(), Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
      ]);
  }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListKeanggotaans::route('/'),
      'create' => Pages\CreateKeanggotaan::route('/create'),
      'edit' => Pages\EditKeanggotaan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return 'Keanggotaan';
  }

  public static function getNavigationGroup(): ?string
  {
    return 'Manajemen Keanggotaan';
  }
}
