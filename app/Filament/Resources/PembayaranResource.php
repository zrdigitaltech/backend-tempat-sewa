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

  protected static ?string $navigationLabel = 'Payment';

  protected static ?string $navigationGroup = 'Contact Us';

  protected static ?int $navigationSort = 7;

  public static ?string $label = 'Payment';

  protected static ?string $slug = 'payment';

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
          TextInput::make('nama_rek')->required()->label('Name Rek')->maxLength(255),
          TextInput::make('nama_bank')->required()->label('Name Bank')->maxLength(255),
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
        TextColumn::make('nama_rek')->label('Name Rek'),
        TextColumn::make('nama_bank')->label('Name Bank'),
      ])
      ->filters([
        //
      ])
      ->actions([ViewAction::make()->label(''), EditAction::make()->label(''), DeleteAction::make()->label('')])
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
}
