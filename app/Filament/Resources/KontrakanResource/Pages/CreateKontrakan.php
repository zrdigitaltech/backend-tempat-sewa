<?php

namespace App\Filament\Resources\KontrakanResource\Pages;

use App\Filament\Resources\KontrakanResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateKontrakan extends CreateRecord
{
  protected static string $resource = KontrakanResource::class;

  protected static bool $canCreateAnother = false;
}
