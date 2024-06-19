<?php

namespace App\Filament\Widgets;

use App\Models\AreaLayanan;
use Filament\Widgets\Widget;

class AreaLayananWidget extends Widget
{
  protected static string $view = 'filament.widgets.area-layanan-widget';

  protected function getViewData(): array
  {
    $areaLayananCount = AreaLayanan::count();

    return [
      'areaLayananCount' => $areaLayananCount,
    ];
  }
}
