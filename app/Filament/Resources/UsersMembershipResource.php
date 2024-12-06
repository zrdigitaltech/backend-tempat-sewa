<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UsersMembershipResource\Pages;
use App\Filament\Resources\UsersMembershipResource\RelationManagers;
use App\Models\UsersMembership;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UsersMembershipResource extends Resource
{
    protected static ?string $model = UsersMembership::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

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
            'index' => Pages\ListUsersMemberships::route('/'),
            'create' => Pages\CreateUsersMembership::route('/create'),
            'edit' => Pages\EditUsersMembership::route('/{record}/edit'),
        ];
    }

    public static function getNavigationLabel(): string
    {
        return __('Data Keanggotaan');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('Manajemen Keanggotaan');
    }
}
