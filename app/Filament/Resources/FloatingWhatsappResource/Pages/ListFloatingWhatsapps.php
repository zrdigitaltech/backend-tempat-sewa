<?php

namespace App\Filament\Resources\FloatingWhatsappResource\Pages;

use App\Filament\Resources\FloatingWhatsappResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\FloatingWhatsapp;

class ListFloatingWhatsapps extends ListRecords
{
  protected static string $resource = FloatingWhatsappResource::class;

  protected function getHeaderActions(): array
  {
    $actions = [];

    if (FloatingWhatsapp::count() < 1) {
      $actions[] = Actions\CreateAction::make();
    }

    return $actions;
  }
}
