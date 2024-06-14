<?php

namespace App\Filament\Resources\TentangKamiResource\Pages;

use App\Filament\Resources\TentangKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\TentangKami;

class ListTentangKamis extends ListRecords
{
  protected static string $resource = TentangKamiResource::class;

  protected function getHeaderActions(): array
  {
    $actions = [];

    if (TentangKami::count() < 1) {
      $actions[] = Actions\CreateAction::make();
    }

    return $actions;
  }
}
