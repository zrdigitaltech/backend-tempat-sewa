<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NumberLayananResource\Pages;
use App\Filament\Resources\NumberLayananResource\RelationManagers;
use App\Models\NumberLayanan;
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
use Filament\Forms\Components\TextArea;

class NumberLayananResource extends Resource
{
    protected static ?string $model = NumberLayanan::class;

    protected static ?string $navigationIcon = 'heroicon-s-information-circle';

    protected static ?string $navigationLabel = 'Number Layanan';

    protected static ?string $navigationGroup = 'Home';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
      return $form
          ->schema([
              Card::make()
                  ->schema([
                      TextInput::make('tahun_pengalaman')
                          ->label('Years Experience')
                          ->required()
                          ->numeric()
                          ->maxLength(255),
                      TextArea::make('description_pengalaman')
                          ->label('Description Experience')
                          ->required()
                          ->maxLength(255),
                      TextArea::make('certification_description')
                          ->label('Description Certification')
                          ->required()
                          ->maxLength(255),
                      TextArea::make('operasional_description')
                          ->label('Description Operational')
                          ->required()
                          ->maxLength(255),
                      TextArea::make('harga_wajar_description')
                          ->label('Description Price')
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
              TextColumn::make('tahun_pengalaman')
                ->label('Years Experience'),
              TextColumn::make('description_pengalaman')
                ->label('Description Experience'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListNumberLayanans::route('/'),
            'create' => Pages\CreateNumberLayanan::route('/create'),
            'edit' => Pages\EditNumberLayanan::route('/{record}/edit'),
        ];
    }
}
