<?php

namespace App\Filament\Resources\KontakKamiResource\Pages;

use App\Filament\Resources\KontakKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKontakKami extends EditRecord
{
    protected static string $resource = KontakKamiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
