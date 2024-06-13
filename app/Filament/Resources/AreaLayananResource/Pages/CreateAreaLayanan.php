<?php

namespace App\Filament\Resources\AreaLayananResource\Pages;

use App\Filament\Resources\AreaLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateAreaLayanan extends CreateRecord
{
    protected static string $resource = AreaLayananResource::class;

    protected static bool $canCreateAnother = false;
}
