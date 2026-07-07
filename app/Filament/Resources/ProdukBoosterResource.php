<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProdukBoosterResource\Pages;
use App\Models\ProdukBooster;
use Filament\Forms\Form;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class ProdukBoosterResource extends Resource
{
    protected static ?string $model = ProdukBooster::class;

    protected static ?string $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationGroup = 'Iklan & Promosi';
    protected static ?string $navigationLabel = 'Produk Booster';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                TextInput::make('nama')->required(),
                TextInput::make('harga'),
                Toggle::make('prioritas'),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('nama')->searchable(),
            TextColumn::make('harga'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProdukBooster::route('/'),
            'create' => Pages\CreateProdukBooster::route('/create'),
            'edit' => Pages\EditProdukBooster::route('/{record}/edit'),
        ];
    }
}
