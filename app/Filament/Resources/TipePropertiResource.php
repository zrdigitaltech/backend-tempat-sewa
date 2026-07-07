<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TipePropertiResource\Pages;
use App\Models\TipeProperti;
use Filament\Forms\Form;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class TipePropertiResource extends Resource
{
    protected static ?string $model = TipeProperti::class;

    protected static ?string $navigationIcon = 'heroicon-o-archive-box';
    protected static ?string $navigationGroup = 'Manajemen Properti';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                TextInput::make('nama')->required(),
                TextInput::make('slug'),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('nama')->searchable(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTipePropertis::route('/'),
            'create' => Pages\CreateTipeProperti::route('/create'),
            'edit' => Pages\EditTipeProperti::route('/{record}/edit'),
        ];
    }
}
