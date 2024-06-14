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

class CallToActionResource extends Resource
{
    protected static ?string $model = CallToAction::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Call To Action';

    protected static ?string $navigationGroup = 'Call To Action';

    protected static ?int $navigationSort = 3;

    public static ?string $label = 'Call To Action';

    protected static ?string $slug = 'call-to-action';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
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
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
