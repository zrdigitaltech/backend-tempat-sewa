<?php

namespace App\Filament\Resources;

use App\Models\UserActivity;
use Filament\Forms\Form;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Forms\Components\{TextInput};

class UserActivityResource extends Resource
{
  protected static ?string $model = UserActivity::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
  protected static ?string $navigationLabel = 'Aktivitas Pengguna';
  protected static ?string $pluralLabel = 'Aktivitas Pengguna';
  protected static ?string $modelLabel = 'Aktivitas';
  protected static ?int $navigationSort = 99;

  public static function form(Form $form): Form
  {
    // Kosong karena resource ini read-only
    return $form->schema([]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->defaultSort('created_at', 'desc')
      ->columns([
        TextColumn::make('user.username')->label('Nama Pengguna')->sortable(),

        TextColumn::make('aksi')->label('Aktivitas')->badge()->color(
          fn(string $state): string => match ($state) {
            'Login' => 'success',
            'Logout' => 'gray',
            'Update Paket' => 'warning',
            default => 'primary',
          }
        ),

        TextColumn::make('keterangan')
          ->label('Detail')
          ->limit(50)
          ->tooltip(fn(string $state) => $state),

        TextColumn::make('created_at')->label('Waktu')->dateTime()->sortable(),
      ])
      ->filters([
        // ✅ Filter berdasarkan jenis aktivitas
        Tables\Filters\SelectFilter::make('aksi')
          ->label('Jenis Aktivitas')
          ->options([
            'Login' => 'Login',
            'Logout' => 'Logout',
            'Perubahan Paket' => 'Perubahan Paket',
          ])
          ->placeholder('Pilih jenis aktivitas'),

        // ✅ Filter berdasarkan pengguna
        Tables\Filters\SelectFilter::make('user_id')
          ->label('Pengguna')
          ->relationship('user', 'name')
          ->getOptionLabelFromRecordUsing(fn($record) => "{$record->name} ({$record->username})")
          ->searchable()
          ->placeholder('Pilih pengguna'),

        // ✅ Filter cepat: Login Hari Ini
        Tables\Filters\Filter::make('login_today')
          ->label('Login Hari Ini')
          ->query(
            fn(Builder $query) => $query->whereDate('created_at', today())->where('aksi', 'Login')
          ),

        // ✅ Filter rentang tanggal
        Tables\Filters\Filter::make('tanggal')
          ->label('Tanggal Aktivitas')
          ->form([DatePicker::make('from')->label('Dari'), DatePicker::make('to')->label('Sampai')])
          ->columns(2)
          ->query(function (Builder $query, array $data) {
            return $query
              ->when($data['from'], fn($q) => $q->whereDate('created_at', '>=', $data['from']))
              ->when($data['to'], fn($q) => $q->whereDate('created_at', '<=', $data['to']));
          })
          ->indicateUsing(function (array $data): ?string {
            if ($data['from'] && $data['to']) {
              return 'Tanggal: ' . $data['from'] . ' - ' . $data['to'];
            }
            if ($data['from']) {
              return 'Mulai ' . $data['from'];
            }
            if ($data['to']) {
              return 'Sampai ' . $data['to'];
            }
            return null;
          }),
      ])
      ->filtersLayout(FiltersLayout::AboveContentCollapsible)
      ->filtersFormColumns(2)

      ->actions([])
      ->bulkActions([]);
  }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      'index' => \App\Filament\Resources\UserActivityResource\Pages\ListUserActivities::route('/'),
    ];
  }
}
