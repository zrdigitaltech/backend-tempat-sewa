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
use Filament\Tables\Columns\{TextColumn, IconColumn, BadgeColumn};
use Carbon\Carbon;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Forms\Components\{TextInput, Grid, Select, FileUpload, Textarea, Fieldset, Section};
use Illuminate\Support\HtmlString;

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

      Forms\Components\Select::make('id_paket_keanggotaan')
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
          $paketId = $get('id_paket_keanggotaan');
          $paket = $paketId ? \App\Models\PaketKeanggotaan::find($paketId) : null;

          if ($paket && $state && is_numeric($paket->durasi_bulan) && $paket->durasi_bulan > 0) {
            $tanggalBerakhir = Carbon::parse($state)->addMonths((int) $paket->durasi_bulan);
            $set('tanggal_berakhir', $tanggalBerakhir->toDateString());
          } else {
            $set('tanggal_berakhir', null);
          }
        }),

      Forms\Components\DatePicker::make('tanggal_berakhir')
        ->label('Tanggal Berakhir')
        ->readOnly(true)
        ->dehydrated(),

      Forms\Components\Toggle::make('aktif')->label('Status Aktif')->default(true),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('user.username')
          ->label(new HtmlString('Nama<br>Pengguna'))
          ->extraHeaderAttributes([
            'class' => 'text-left',
          ]),

        BadgeColumn::make('paket.nama')
          ->label(new HtmlString('Paket<br>Keanggotaan'))
          ->extraHeaderAttributes([
            'class' => 'text-left',
          ])
          ->colors([
            'gray' => fn($state) => strtolower($state ?? '') === 'gratis',
            'warning' => fn($state) => strtolower($state ?? '') === 'premium',
            'success' => fn($state) => strtolower($state ?? '') === 'unlimited',
          ])
          ->formatStateUsing(fn($state) => ucfirst($state)),

        TextColumn::make('tanggal_mulai')->label('Mulai')->date(),

        TextColumn::make('tanggal_berakhir')->label('Berakhir')->date(),

        BadgeColumn::make('sisa_hari')
          ->colors([
              'gray' => fn ($record) => !$record->tanggal_berakhir,
              'danger' => fn ($record) =>
                  $record->tanggal_berakhir &&
                  Carbon::today()->diffInDays($record->tanggal_berakhir, false) <= 7,
              'success' => fn ($record) =>
                  $record->tanggal_berakhir &&
                  Carbon::today()->diffInDays($record->tanggal_berakhir, false) > 7,
          ]),

        IconColumn::make('aktif')->boolean()->label('Aktif')->toggleable()->alignCenter(),

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
        Filter::make('search')
          ->label('Cari')
          ->form([
            TextInput::make('search')
              ->label('Nama Pengguna')
              ->placeholder('Masukkan nama pengguna'),
          ])
          ->query(function ($query, array $data) {
            $search = $data['search'] ?? null;
            if ($search) {
              $query->whereHas('user', function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%");
              });
            }
          }),
        SelectFilter::make('id_paket_keanggotaan')
          ->label('Paket Keanggotaan')
          ->relationship('paket', 'nama')
      ])
      ->filtersLayout(FiltersLayout::AboveContentCollapsible)
      ->filtersFormColumns(2)
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
