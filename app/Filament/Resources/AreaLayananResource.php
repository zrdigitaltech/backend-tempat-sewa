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

class AreaLayananResource extends Resource
{
    protected static ?string $model = AreaLayanan::class;

    protected static ?string $navigationIcon = 'heroicon-s-information-circle';

    protected static ?string $navigationLabel = 'Area Layanan';

    protected static ?string $navigationGroup = 'Home';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
      return $form
          ->schema([
              Card::make()
                  ->schema([
                      TextInput::make('title')
                          ->label('Title')
                          ->required()
                          ->maxLength(255),
                  ])->columnSpanFull()
          ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginated(false)
            ->columns([
              TextColumn::make('title'),
            ])
            ->filters([
                //
            ])
            ->actions([
              Tables\Actions\EditAction::make(),
              Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\CreateAction::make()
                    ->createAnother(false)
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
