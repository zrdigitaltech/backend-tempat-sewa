<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Layanan;

class LayananWidget extends Widget
{
  protected static string $view = 'filament.widgets.layanan-widget';

  protected function getViewData(): array
  {
    $LayananCount = Layanan::count();

    return [
      'LayananCount' => $LayananCount,
    ];
  }
}
