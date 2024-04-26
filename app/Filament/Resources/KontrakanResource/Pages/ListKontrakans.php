<?php

namespace App\Filament\Resources\KontrakanResource\Pages;

use App\Filament\Resources\KontrakanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKontrakans extends ListRecords
{
  protected static string $resource = KontrakanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\CreateAction::make()];
  }
}
