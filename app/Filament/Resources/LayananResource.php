<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LayananResource\Pages;
use App\Filament\Resources\LayananResource\RelationManagers;
use App\Models\Layanan;
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
use Filament\Forms\Components\TextArea;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class LayananResource extends Resource
{
  protected static ?string $model = Layanan::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  protected static ?string $navigationLabel = 'Services';

  protected static ?string $navigationGroup = 'Services';

  protected static ?int $navigationSort = 2;

  protected static ?string $label = 'Services';

  protected static ?string $slug = 'services';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          FileUpload::make('image')
            ->required()
            ->acceptedFileTypes(['image/*']),
          TextInput::make('title')->required()->maxLength(255),
          TextInput::make('alt')->default('Mekanik Elektro')->maxLength(255),
          TextArea::make('description')->maxLength(255),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([ImageColumn::make('image'), TextColumn::make('title')->searchable()])
      ->defaultSort('created_at', 'desc')
      ->filters([
        //
      ])
      ->actions([ViewAction::make(), EditAction::make(), DeleteAction::make()])
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
      'index' => Pages\ListLayanans::route('/'),
      'create' => Pages\CreateLayanan::route('/create'),
      'edit' => Pages\EditLayanan::route('/{record}/edit'),
    ];
  }
}
