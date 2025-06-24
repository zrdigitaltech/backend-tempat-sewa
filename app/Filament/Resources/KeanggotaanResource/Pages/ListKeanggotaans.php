<?php

namespace App\Filament\Resources\KeanggotaanResource\Pages;

use App\Filament\Resources\KeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKeanggotaans extends ListRecords
{
  protected static string $resource = KeanggotaanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\CreateAction::make()];
  }
}
