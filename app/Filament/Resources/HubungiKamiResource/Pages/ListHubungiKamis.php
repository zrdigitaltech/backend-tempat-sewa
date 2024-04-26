<?php

namespace App\Filament\Resources\HubungiKamiResource\Pages;

use App\Filament\Resources\HubungiKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\HubungiKami;

class ListHubungiKamis extends ListRecords
{
  protected static string $resource = HubungiKamiResource::class;

  protected function getHeaderActions(): array
  {
    $actions = [];

    if (HubungiKami::count() < 1) {
      $actions[] = Actions\CreateAction::make();
    }

    return $actions;
  }
}
