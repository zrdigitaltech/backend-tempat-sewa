<?php

namespace App\Filament\Resources\LogoResource\Pages;

use App\Filament\Resources\LogoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\Logo;

class ListLogos extends ListRecords
{
  protected static string $resource = LogoResource::class;

  protected function getHeaderActions(): array
  {
    $actions = [];

    if (Logo::count() < 1) {
      $actions[] = Actions\CreateAction::make();
    }

    return $actions;
  }
}
