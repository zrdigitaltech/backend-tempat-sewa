<?php

namespace App\Filament\Resources\AreaLayananResource\Pages;

use App\Filament\Resources\AreaLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAreaLayanan extends EditRecord
{
    protected static string $resource = AreaLayananResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
