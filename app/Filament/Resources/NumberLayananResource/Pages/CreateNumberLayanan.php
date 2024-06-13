<?php

namespace App\Filament\Resources\NumberLayananResource\Pages;

use App\Filament\Resources\NumberLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateNumberLayanan extends CreateRecord
{
    protected static string $resource = NumberLayananResource::class;

    protected static bool $canCreateAnother = false;
}
