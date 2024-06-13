<?php

namespace App\Filament\Resources\NumberLayananResource\Pages;

use App\Filament\Resources\NumberLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\NumberLayanan;

class ListNumberLayanans extends ListRecords
{
    protected static string $resource = NumberLayananResource::class;

    protected function getHeaderActions(): array
    {
        $actions = [];

        if (NumberLayanan::count() < 1) {
            $actions[] = Actions\CreateAction::make();
        }

        return $actions;
    }
}
