<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TagihanResource\Pages;
use App\Filament\Resources\TagihanResource\RelationManagers;
// use App\Models\Tagihan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TagihanResource extends Resource
{
  // protected static ?string $model = Tagihan::class;

  protected static ?string $navigationIcon = 'heroicon-o-document-currency-dollar';

  protected static ?int $navigationSort = 3;

  protected static ?string $navigationLabel = 'Cek Tagihan';

  protected static ?string $label = 'Cek Tagihan';

  protected static ?string $slug = 'cek-tagihan';

  public static function form(Form $form): Form
  {
    return $form->schema([
      //
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        //
      ])
      ->filters([
        //
      ])
      ->actions([Tables\Actions\EditAction::make()])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
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
      'index' => Pages\ListTagihans::route('/'),
      'create' => Pages\CreateTagihan::route('/create'),
      'edit' => Pages\EditTagihan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Cek Tagihan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Pengelolaan');
  }
}
