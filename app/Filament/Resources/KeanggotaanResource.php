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
use Filament\Tables\Columns\{TextColumn, IconColumn};
use Carbon\Carbon;

class KeanggotaanResource extends Resource
{
  protected static ?string $model = Keanggotaan::class;

  protected static ?string $navigationIcon = 'heroicon-o-identification';
  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Forms\Components\Select::make('id_user')
        ->label('Nama Pengguna')
        ->relationship('user', 'username')
        ->searchable()
        ->placeholder('Ketik username...')
        ->required()
        ->disabled(),

      Forms\Components\Select::make('id_paketkeanggotaan')
        ->label('Paket Keanggotaan')
        ->relationship('paket', 'nama')
        ->required()
        ->reactive() // penting agar bisa trigger perubahan
        ->afterStateUpdated(function (callable $set) {
          // reset tanggal mulai dan tanggal berakhir
          $set('tanggal_mulai', null);
          $set('tanggal_berakhir', null);
        }),

      Forms\Components\DatePicker::make('tanggal_mulai')
        ->label('Tanggal Mulai')
        ->required()
        ->reactive()
        ->minDate(Carbon::today(config('app.timezone')))
        ->rule('after_or_equal:' . Carbon::today(config('app.timezone'))->toDateString())
        ->afterStateUpdated(function ($state, callable $set, callable $get) {
          $paketId = $get('id_paketkeanggotaan');
          $paket = $paketId ? \App\Models\PaketKeanggotaan::find($paketId) : null;

          if ($paket && $state && is_numeric($paket->durasi_bulan) && $paket->durasi_bulan > 0) {
            $tanggalBerakhir = Carbon::parse($state)->addMonths((int) $paket->durasi_bulan);
            $set('tanggal_berakhir', $tanggalBerakhir->toDateString());
          } else {
            $set('tanggal_berakhir', null);
          }
        }),

      Forms\Components\DatePicker::make('tanggal_berakhir')->label('Tanggal Berakhir')->disabled(),

      Forms\Components\Toggle::make('aktif')->label('Status Aktif')->default(true),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('user.username')->label('Nama Pengguna')->searchable(),

        TextColumn::make('paket.nama')->label('Paket Keanggotaan'),

        TextColumn::make('tanggal_mulai')->label('Mulai')->date(),

        TextColumn::make('tanggal_berakhir')->label('Berakhir')->date(),

        IconColumn::make('aktif')->boolean()->label('Aktif'),

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
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->actions([
        Tables\Actions\ViewAction::make()->iconButton()->tooltip('Lihat detail'),
        Tables\Actions\EditAction::make()->iconButton()->tooltip('Ubah'),
        Tables\Actions\DeleteAction::make()->iconButton()->tooltip('Hapus'),
      ])
      ->bulkActions([
        // Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
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
