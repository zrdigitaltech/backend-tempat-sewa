<?php

namespace App\Filament\Resources;

use App\Models\User;
use App\Models\PaketKeanggotaan;
use App\Models\Keanggotaan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Table;
use Filament\Forms\Components\{TextInput, Grid, Select};
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Actions\Action as FormAction;
use Filament\Tables\Actions\{
  ViewAction,
  EditAction,
  DeleteAction,
  BulkActionGroup,
  DeleteBulkAction
};
use App\Filament\Resources\UserResource\Pages;
use Filament\Tables\Actions\Action;

use Illuminate\Support\Str;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Filters\SelectFilter;
use Filament\Support\RawJs;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Columns\IconColumn;

class UserResource extends Resource
{
  protected static ?string $model = User::class;
  protected static ?string $navigationIcon = 'heroicon-o-user';
  protected static ?string $slug = 'user';
  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Grid::make(1)->schema([
        TextInput::make('name')->label('Nama')->required()->autocomplete(false),

        TextInput::make('username')
          ->label('Username')
          ->required()
          ->maxLength(255)
          ->unique(ignoreRecord: true)
          ->autocomplete(false),

        TextInput::make('email')
          ->email()
          ->required()
          ->unique(ignoreRecord: true)
          ->autocomplete('off'),

        TextInput::make('password')
          ->label('Password')
          ->password()
          ->dehydrated(fn($state) => filled($state))
          ->required(fn(string $context) => $context === 'create')
          ->autocomplete('new-password')
          ->suffixActions([
            FormAction::make('show')->icon('heroicon-o-eye')->action(fn($c) => $c->type('text')),
            FormAction::make('hide')
              ->icon('heroicon-o-eye-slash')
              ->action(fn($c) => $c->type('password')),
          ]),

        Select::make('roles')->label('Role')->relationship('roles', 'name')->preload()->required(),
      ]),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->modifyQueryUsing(function (Builder $query) {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
          $query->whereNot('id', $user->id);
        } else {
          $query->where('created_by', $user->id)->whereNot('id', $user->id);
        }
      })
      ->columns([
        TextColumn::make('name')->label('Nama'),
        TextColumn::make('username')->label('Username'),
        TextColumn::make('email'),
        TextColumn::make('roles.name')->label('Role'),
        TextColumn::make('email_verified_at')
          ->label('Terverifikasi')
          ->alignCenter()
          ->view('filament.components.email-status')
          ->viewData(fn($record) => ['record' => $record])
          ->tooltip(
            fn($record) => $record->email_verified_at
              ? 'Email sudah diverifikasi'
              : 'Belum diverifikasi'
          ),

        TextColumn::make('created_at')->label('Dibuat pada')->dateTime()->toggleable(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters(
        [
          Filter::make('search')
            ->label('Cari')
            ->form([
              TextInput::make('search')
                ->label('Nama / Email / Username')
                ->placeholder('Masukkan nama, email, atau username'),
            ])
            ->query(function ($query, array $data) {
              $search = $data['search'] ?? null;
              if ($search) {
                $query->where(function ($query) use ($search) {
                  $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
                });
              }
            }),
          TernaryFilter::make('email_verified_at')
            ->label('Terverifikasi')
            ->placeholder('Semua')
            ->trueLabel('Email sudah diverifikasi')
            ->falseLabel('Belum diverifikasi')
            ->queries(
              true: fn(Builder $query) => $query->whereNotNull('email_verified_at'),
              false: fn(Builder $query) => $query->whereNull('email_verified_at'),
              blank: fn(Builder $query) => $query // In this example, we do not want to filter the query when it is blank.
            ),
        ]
        // layout: FiltersLayout::AboveContentCollapsible
      )
      ->filtersLayout(FiltersLayout::AboveContentCollapsible)
      ->filtersFormColumns(2) // Display filters in 2 columns
      ->actions([
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
        Action::make('verifikasiEmail')
          ->icon('heroicon-o-check-circle')
          ->tooltip('Verifikasi Email') // 👈 Tooltip saat hover
          ->requiresConfirmation()
          ->visible(fn(User $record) => is_null($record->email_verified_at))
          ->action(function (User $record): void {
            $record->email_verified_at = now();
            $record->save();
          })
          ->color('success')
          ->iconButton(),
      ])
      ->bulkActions([
        // BulkActionGroup::make([DeleteBulkAction::make()])
      ]);
  }

  public static function getRelations(): array
  {
    return [];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListUsers::route('/'),
      'create' => Pages\CreateUser::route('/create'),
      'edit' => Pages\EditUser::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('User');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Manajemen Keanggotaan');
  }
}
