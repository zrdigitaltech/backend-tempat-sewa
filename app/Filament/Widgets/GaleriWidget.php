<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Galeri;

class GaleriWidget extends Widget
{
  protected static string $view = 'filament.widgets.galeri-widget';

  protected function getViewData(): array
  {
    $GaleriCount = Galeri::count();

    return [
      'GaleriCount' => $GaleriCount,
    ];
  }
}
