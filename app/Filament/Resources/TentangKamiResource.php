<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TentangKamiResource\Pages;
use App\Filament\Resources\TentangKamiResource\RelationManagers;
use App\Models\TentangKami;
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

class TentangKamiResource extends Resource
{
  protected static ?string $model = TentangKami::class;

  protected static ?string $navigationIcon = 'heroicon-s-information-circle';

  protected static ?string $navigationLabel = 'About Us';

  protected static ?string $navigationGroup = 'About Us';

  protected static ?int $navigationSort = 1;

  public static ?string $label = 'About Us';

  protected static ?string $slug = 'about-us';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          FileUpload::make('image')
            ->required()
            ->acceptedFileTypes(['image/*']),
          TextInput::make('alt')->default('Mekanik Elektro')->maxLength(255),
          RichEditor::make('description')->maxLength(255),
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
        ImageColumn::make('image'),
        TextColumn::make('alt'),
        TextColumn::make('description')->html()->words(7),
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
      'index' => Pages\ListTentangKamis::route('/'),
      'create' => Pages\CreateTentangKami::route('/create'),
      'edit' => Pages\EditTentangKami::route('/{record}/edit'),
    ];
  }
}
