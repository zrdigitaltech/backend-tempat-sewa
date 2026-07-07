<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BoosterTransaksiResource\Pages;
use App\Models\BoosterTransaksi;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class BoosterTransaksiResource extends Resource
{
    protected static ?string $model = BoosterTransaksi::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Iklan & Promosi';
    protected static ?string $navigationLabel = 'Transaksi Booster';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                TextInput::make('user_id'),
                TextInput::make('properti_id'),
                DatePicker::make('tanggal_mulai'),
                DatePicker::make('tanggal_berakhir'),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('user_id'),
            TextColumn::make('properti_id'),
            TextColumn::make('status'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBoosterTransaksis::route('/'),
            'create' => Pages\CreateBoosterTransaksi::route('/create'),
            'edit' => Pages\EditBoosterTransaksi::route('/{record}/edit'),
        ];
    }
}
