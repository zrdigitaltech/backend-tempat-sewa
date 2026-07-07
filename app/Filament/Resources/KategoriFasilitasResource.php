<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KategoriFasilitasResource\Pages;
use App\Models\KategoriFasilitas;
use Filament\Forms\Form;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class KategoriFasilitasResource extends Resource
{
    protected static ?string $model = KategoriFasilitas::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';
    protected static ?string $navigationGroup = 'Manajemen Properti';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                TextInput::make('nama')->required(),
                TextInput::make('jenis'),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('nama')->searchable(),
            TextColumn::make('jenis'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKategoriFasilitass::route('/'),
            'create' => Pages\CreateKategoriFasilitas::route('/create'),
            'edit' => Pages\EditKategoriFasilitas::route('/{record}/edit'),
        ];
    }
}
