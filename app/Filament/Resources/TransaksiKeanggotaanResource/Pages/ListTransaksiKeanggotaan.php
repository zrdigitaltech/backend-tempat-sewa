<?php

namespace App\Filament\Resources\TransaksiKeanggotaanResource\Pages;

use App\Filament\Resources\TransaksiKeanggotaanResource;
use Filament\Resources\Pages\ListRecords;

class ListTransaksiKeanggotaan extends ListRecords
{
    protected static string $resource = TransaksiKeanggotaanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }
}