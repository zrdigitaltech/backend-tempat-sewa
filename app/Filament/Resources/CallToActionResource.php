<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CallToActionResource\Pages;
use App\Filament\Resources\CallToActionResource\RelationManagers;
use App\Models\CallToAction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
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

class CallToActionResource extends Resource
{
  protected static ?string $model = CallToAction::class;

  protected static ?string $navigationIcon = 'heroicon-o-phone';

  protected static ?string $navigationLabel = 'Call To Action';

  protected static ?string $navigationGroup = 'Call To Action';

  protected static ?int $navigationSort = 3;

  public static ?string $label = 'Call To Action';

  protected static ?string $slug = 'call-to-action';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('title')->required()->maxLength(255),
          TextArea::make('subtitle')->required()->rows(3)->maxLength(255),
          TextInput::make('link_wa')->required()->label('Link Whatsapp')->url()->maxLength(255),
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
        TextColumn::make('title')->words(3),
        TextColumn::make('subtitle')->words(5),
        TextColumn::make('link_wa')->words(2)->label('Link Whatsapp'),
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
      'index' => Pages\ListCallToActions::route('/'),
      'create' => Pages\CreateCallToAction::route('/create'),
      'edit' => Pages\EditCallToAction::route('/{record}/edit'),
    ];
  }
}
