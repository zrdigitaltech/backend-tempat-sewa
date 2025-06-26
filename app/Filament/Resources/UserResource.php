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
use Filament\Forms\Components\{TextInput, Grid, Select, FileUpload, Textarea, Fieldset, Section};
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
use Filament\Resources\Pages\Page;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Closure;

class UserResource extends Resource
{
  protected static ?string $model = User::class;
  protected static ?string $navigationIcon = 'heroicon-o-user';
  protected static ?string $slug = 'user';
  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Section::make('Akun Pengguna')
        ->description('Isi informasi dasar untuk membuat akun baru.')
        ->schema([
          Grid::make(2)->schema([
            TextInput::make('name')
              ->label('Nama')
              ->required()
              ->autocomplete(false)
              ->minLength(3)
              ->maxLength(50)
              ->validationMessages([
                'required' => 'Nama wajib diisi.',
                'min' => 'Nama minimal 3 karakter.',
                'max' => 'Nama maksimal 50 karakter.',
              ]),

            TextInput::make('username')
              ->label('Username')
              ->required()
              ->maxLength(255)
              ->unique(ignoreRecord: true)
              ->autocomplete(false)
              ->rule('regex:/^[a-zA-Z0-9._]+$/')
              ->validationMessages([
                'required' => ':attribute wajib diisi.',
                'unique' => ':attribute sudah digunakan.',
                'regex' => ':attribute hanya boleh berisi huruf, angka, titik, dan underscore.',
              ]),

            TextInput::make('no_whatsapp')
              ->label('No WhatsApp')
              ->required()
              ->prefix('+62')
              ->autocomplete('off')
              ->placeholder('812xxxxxxxx')
              ->numeric()
              ->minLength(9)
              ->maxLength(13) // 13 + 2 = 15 digit total
              ->formatStateUsing(fn($state) => preg_replace('/^62/', '', $state)) // tampil tanpa 62
              ->afterStateHydrated(function ($component, $state) {
                if (Str::startsWith($state, '62')) {
                  $component->state(Str::replaceFirst('62', '', $state));
                }
              })
              ->dehydrateStateUsing(fn($state) => '62' . ltrim($state, '0')) // simpan dengan 62
              ->rule(function ($get, $record) {
                return function (string $attribute, $value, Closure $fail) use ($record) {
                  $normalized = '62' . ltrim($value, '0');

                  $exists = \App\Models\User::where('no_whatsapp', $normalized)
                    ->when($record?->id, fn($q) => $q->where('id', '!=', $record->id))
                    ->exists();

                  if ($exists) {
                    $fail('Nomor WhatsApp sudah terdaftar.');
                  }
                };
              })
              ->validationMessages([
                'required' => 'No WhatsApp wajib diisi.',
                'min' => 'Minimal 9 digit.',
                'max' => 'Maksimal 13 digit (tanpa kode negara).',
                'unique' => 'Nomor WhatsApp sudah terdaftar.',
              ]),

            TextInput::make('email')
              ->label('Email')
              ->email()
              ->required()
              ->unique(ignoreRecord: true)
              ->autocomplete('off')
              ->validationMessages([
                'required' => 'Email wajib diisi.',
                'email' => 'Format :attribute tidak valid.',
                'unique' => 'Email sudah terdaftar.',
              ]),

            Select::make('roles')
              ->label('Role')
              ->relationship('roles', 'name')
              ->preload()
              ->required()
              ->validationMessages([
                'required' => ':attribute wajib dipilih.',
              ]),

            TextInput::make('password')
              ->label('Password')
              ->password()
              ->dehydrated(fn($state) => filled($state))
              ->required(fn(string $context) => $context === 'create')
              ->autocomplete('new-password')
              ->suffixActions([
                FormAction::make('show')
                  ->icon('heroicon-o-eye')
                  ->action(fn($c) => $c->type('text')),
                FormAction::make('hide')
                  ->icon('heroicon-o-eye-slash')
                  ->action(fn($c) => $c->type('password')),
              ])
              ->validationMessages([
                'required' => ':attribute wajib diisi saat membuat akun.',
              ]),
          ]),
        ]),

      Section::make('Profil Pengguna')
        ->description('Detail opsional untuk melengkapi informasi pengguna.')
        ->schema([
          FileUpload::make('avatar')
            ->label('Avatar')
            ->image()
            ->directory('avatars')
            ->imageEditor()
            ->nullable(),

          Textarea::make('bio')->label('Bio')->maxLength(500)->rows(4)->nullable(),

          Fieldset::make('Sosial Media')
            ->statePath('socials')
            ->columns(2)
            ->schema([
              TextInput::make('instagram')
                ->label('Instagram')
                ->url()
                ->placeholder('https://instagram.com/akunmu')
                ->validationMessages([
                  'url' => 'Link Instagram harus berupa URL yang valid.',
                ]),

              TextInput::make('linkedin')
                ->label('LinkedIn')
                ->url()
                ->placeholder('https://linkedin.com/in/akunmu')
                ->validationMessages([
                  'url' => 'Link LinkedIn harus berupa URL yang valid.',
                ]),
            ]),
        ])
        ->collapsed(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->modifyQueryUsing(function (Builder $query) {
        $user = Auth::user();

        if ($user->hasRole(['super_admin', 'admin'])) {
          $query->whereNot('id', $user->id);
        } else {
          $query->where('created_by', $user->id)->whereNot('id', $user->id);
        }
      })
      ->columns([
        TextColumn::make('name')->label('Nama'),
        TextColumn::make('username')->label('Username'),
        TextColumn::make('no_whatsapp')->label('No WhatsApp'),
        // ->formatStateUsing(fn($state) => '62' . ltrim($state, '0'))
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
        TextColumn::make('created_at')
          ->label('Dibuat pada')
          ->dateTime()
          ->toggleable()
          ->toggledHiddenByDefault(),

        TextColumn::make('created_by.name')
          ->label('Dibuat Oleh')
          ->toggleable()
          ->toggledHiddenByDefault(),

        TextColumn::make('updated_by.name')
          ->label('Diperbarui Oleh')
          ->toggleable()
          ->toggledHiddenByDefault(),
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
        DeleteAction::make()->iconButton()
        ->disabled(fn(User $record) => !auth()->user()?->hasRole('super_admin'))
        // ->visible(fn() => auth()->user()->hasRole('super_admin'))
        ,
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

  // public static function canAccess(): bool
  // {
  //     return auth()->user()?->hasAnyRole(['super_admin', 'admin']);
  // }
}
