<?php

namespace App\Filament\Resources\LayananKeanggotaanResource\Pages;

use App\Filament\Resources\LayananKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLayananKeanggotaans extends ListRecords
{
    protected static string $resource = LayananKeanggotaanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
