<?php

namespace App\Filament\Resources\KontakKamiResource\Pages;

use App\Filament\Resources\KontakKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\KontakKami;

class ListKontakKamis extends ListRecords
{
  protected static string $resource = KontakKamiResource::class;

  protected function getHeaderActions(): array
  {
    $actions = [];

    if (KontakKami::count() < 1) {
      $actions[] = Actions\CreateAction::make();
    }

    return $actions;
  }
}
