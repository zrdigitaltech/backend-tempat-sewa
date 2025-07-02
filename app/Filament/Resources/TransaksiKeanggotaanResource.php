<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransaksiKeanggotaanResource\Pages;
use App\Models\PaketKeanggotaan;
use App\Models\TransaksiKeanggotaan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Illuminate\Support\Str;
use Filament\Notifications\Notification;

// Pastikan helper tersedia

class TransaksiKeanggotaanResource extends Resource
{
  protected static ?string $model = TransaksiKeanggotaan::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
  protected static ?int $navigationSort = 3;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Select::make('id_user')
        ->label('User')
        ->relationship('user', 'name')
        ->searchable()
        ->required(),

      TextInput::make('kode_transaksi')
        ->label('Kode Transaksi')
        ->default('TRX-' . strtoupper(Str::random(8)))
        ->disabled()
        ->required(),

      TextInput::make('jumlah')->numeric()->required(),

      Select::make('status')
        ->options([
          'pending' => 'Pending',
          'sukses' => 'Sukses',
          'gagal' => 'Gagal',
          'expired' => 'Expired',
        ])
        ->required(),

      TextInput::make('metode_pembayaran'),

      DateTimePicker::make('dibayar_pada'),
      DateTimePicker::make('expired_pada'),

      Textarea::make('catatan')->rows(2),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('kode_transaksi')->searchable()->label('Kode'),
        TextColumn::make('user.username')->searchable()->label('Nama Pengguna'),
        TextColumn::make('jumlah')->money('IDR')->label('Jumlah'),
        BadgeColumn::make('status')
          ->colors([
            'primary' => 'pending',
            'success' => 'sukses',
            'danger' => 'gagal',
            'gray' => 'expired',
          ])
          ->label('Status'),
        TextColumn::make('metode_pembayaran')->label('Metode'),
        TextColumn::make('dibayar_pada')->since()->label('Dibayar')->toggleable(),
        TextColumn::make('expired_pada')->dateTime()->label('Expired')->toggleable(),
        TextColumn::make('created_at')->label('Waktu Buat')->dateTime(),
      ])
      ->actions([
        Tables\Actions\ViewAction::make(),

        Tables\Actions\Action::make('verifikasi')
          ->label('Verifikasi & Aktifkan')
          ->color('success')
          ->icon('heroicon-o-check-badge')
          ->visible(fn($record) => $record->status === 'pending')
          ->requiresConfirmation()
          ->action(function ($record, $livewire) {
            $record->update([
              'status' => 'sukses',
              'dibayar_pada' => now(),
              'metode_pembayaran' => $record->metode_pembayaran ?? 'Manual oleh Admin',
              'updated_by' => auth()->id(),
            ]);

            $paket = PaketKeanggotaan::where('harga', $record->jumlah)->first();

            if ($paket) {
              $keanggotaan = beliAtauPerpanjangPaket($record->user, $paket, auth()->user());

              $record->update([
                'keanggotaan_id' => $keanggotaan->id,
              ]);
            }

            Notification::make()
              ->title('Transaksi berhasil diverifikasi dan keanggotaan diaktifkan.')
              ->success()
              ->send();
          }),
      ])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([
          // Tables\Actions\DeleteBulkAction::make(),
        ]),
      ]);
  }

  // public static function view(Infolist $infolist): Infolist
  // {
  //     return $infolist
  //         ->schema([
  //             TextEntry::make('kode_transaksi'),
  //             TextEntry::make('user.name')->label('User'),
  //             TextEntry::make('status')->badge(),
  //             TextEntry::make('jumlah')->money('IDR'),
  //             TextEntry::make('metode_pembayaran')->label('Metode Pembayaran'),
  //             TextEntry::make('dibayar_pada')->dateTime(),
  //             TextEntry::make('expired_pada')->dateTime(),
  //             TextEntry::make('catatan')->label('Catatan')->visible(fn ($record) => filled($record->catatan)),
  //             TextEntry::make('created_at')->label('Dibuat')->dateTime(),
  //         ]);
  // }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListTransaksiKeanggotaans::route('/'),
      'create' => Pages\CreateTransaksiKeanggotaan::route('/create'),
      'edit' => Pages\EditTransaksiKeanggotaan::route('/{record}/edit'),
      'view' => Pages\ViewTransaksiKeanggotaan::route('/{record}/view'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return 'Riwayat Transaksi';
  }

  public static function getNavigationGroup(): ?string
  {
    return 'Manajemen Keanggotaan';
  }
}
