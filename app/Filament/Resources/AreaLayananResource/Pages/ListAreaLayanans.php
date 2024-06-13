<?php

namespace App\Filament\Resources\AreaLayananResource\Pages;

use App\Filament\Resources\AreaLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAreaLayanans extends ListRecords
{
    protected static string $resource = AreaLayananResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
