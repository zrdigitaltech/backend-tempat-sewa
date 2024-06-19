<?php

namespace App\Filament\Resources\CallToActionResource\Pages;

use App\Filament\Resources\CallToActionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\CallToAction;

class ListCallToActions extends ListRecords
{
    protected static string $resource = CallToActionResource::class;

    protected function getHeaderActions(): array
    {
      $actions = [];

      if (CallToAction::count() < 1) {
        $actions[] = Actions\CreateAction::make();
      }

      return $actions;
    }
}
