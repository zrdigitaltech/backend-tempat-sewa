<?php

namespace App\Filament\Resources\AreaLayananResource\Pages;

use App\Filament\Resources\AreaLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\AreaLayanan;

class ListAreaLayanans extends ListRecords
{
    protected static string $resource = AreaLayananResource::class;

    protected function getHeaderActions(): array
    {
        $actions = [];

        if (AreaLayanan::count() < 5) {
            $actions[] = Actions\CreateAction::make();
        }

        return $actions;
    }
}
