<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PembayaranResource\Pages;
use App\Filament\Resources\PembayaranResource\RelationManagers;
use App\Models\Pembayaran;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class PembayaranResource extends Resource
{
  protected static ?string $model = Pembayaran::class;
  protected static ?string $navigationIcon = 'heroicon-o-banknotes';
  // protected static ?string $navigationLabel = 'Pembayaran';
  // protected static ?string $navigationGroup = 'Contact Us';
  // public static ?string $label = 'Pembayaran';
  protected static ?int $navigationSort = 7;
  protected static ?string $slug = 'pembayaran';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          FileUpload::make('image')
            ->required()
            ->acceptedFileTypes(['image/*']),
          TextInput::make('alt')->default('Mekanik Elektro')->maxLength(255),
          TextInput::make('no_rek')->required()->label('No Rek')->numeric()->maxLength(255),
          TextInput::make('nama_rek')->required()->label('Nama Rek')->maxLength(255),
          TextInput::make('nama_bank')->required()->label('Nama Bank')->maxLength(255),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->paginated(false)
      ->selectable(false)
      ->columns([
        TextColumn::make('no_rek')->label('No Rek'),
        TextColumn::make('nama_rek')->label('Nama Rek'),
        TextColumn::make('nama_bank')->label('Nama Bank'),
      ])
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
      'index' => Pages\ListPembayarans::route('/'),
      'create' => Pages\CreatePembayaran::route('/create'),
      'edit' => Pages\EditPembayaran::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Pembayaran');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Admin Web');
  }
}
