<?php

namespace App\Filament\Resources\ProdukBoosterResource\Pages;

use App\Filament\Resources\ProdukBoosterResource;
use Filament\Resources\Pages\ListRecords;

class ListProdukBooster extends ListRecords
{
    protected static string $resource = ProdukBoosterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }
}