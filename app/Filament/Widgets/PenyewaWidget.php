<?php

namespace App\Filament\Widgets;

use App\Models\Penyewa;
use Filament\Widgets\Widget;

class PenyewaWidget extends Widget
{
  protected static string $view = 'filament.widgets.Penyewa-widget';

  protected function getViewData(): array
  {
    $PenyewaCount = Penyewa::count();

    return [
      'penyewaCount' => $PenyewaCount,
    ];
  }
}
