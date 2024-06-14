<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AreaLayananResource\Pages;
use App\Filament\Resources\AreaLayananResource\RelationManagers;
use App\Models\AreaLayanan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\TextColumn;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class AreaLayananResource extends Resource
{
  protected static ?string $model = AreaLayanan::class;

  protected static ?string $navigationIcon = 'heroicon-s-information-circle';

  protected static ?string $navigationLabel = 'Area Layanan';

  protected static ?string $navigationGroup = 'Home';

  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([TextInput::make('title')->label('Title')->required()->maxLength(255)])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->paginated(false)
      ->columns([TextColumn::make('title')->searchable()])
      ->defaultSort('created_at', 'desc')
      ->filters([
        //
      ])
      ->actions([EditAction::make(), DeleteAction::make()])
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
      'index' => Pages\ListAreaLayanans::route('/'),
      'create' => Pages\CreateAreaLayanan::route('/create'),
      'edit' => Pages\EditAreaLayanan::route('/{record}/edit'),
    ];
  }
}
