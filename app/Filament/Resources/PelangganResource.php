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
use Illuminate\Support\Facades\Auth; 
use Filament\Tables\Actions\{ViewAction, EditAction,DeleteAction, BulkActionGroup, DeleteBulkAction, CreateAction};

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
          TextInput::make('email')
            ->email()
            ->autocomplete(false)
            ->required()
            ->unique(ignoreRecord: true),
          TextInput::make('password')
            ->password()
            ->autocomplete(false)
            ->required()
            ->dehydrateStateUsing(fn($state) => bcrypt($state)),
        ]),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      // ->query(User::role('pelanggan'))
      ->modifyQueryUsing(function (Builder $query) {
        $user = Auth::user();
        if ($user->hasRole('super_admin')) {
          return $query->whereNot('id', $user->id);
        }

        return $query->where('created_by', $user->id)->whereNot('id', $user->id);
      })
      ->columns([
        TextColumn::make('name')->label('Nama')->searchable(),
        TextColumn::make('email')->searchable(),
        TextColumn::make('roles.name')->label('Role'),
        TextColumn::make('createdBy.name')
          ->label('Pembuat')
          ->formatStateUsing(function ($state, $record) {
              return $record->createdBy ? $record->createdBy->name : 'N/A';
          }),
        TextColumn::make('created_at')->label('Register pada')->dateTime(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        //
      ])
      ->actions([
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          CreateAction::make()->createAnother(false),
        ]),
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
