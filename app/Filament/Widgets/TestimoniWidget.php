<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Testimoni;

class TestimoniWidget extends Widget
{
    protected static string $view = 'filament.widgets.testimoni-widget';

    protected function getViewData(): array
    {
      $TestimoniCount = Testimoni::count();

      return [
        'TestimoniCount' => $TestimoniCount,
      ];
    }
}
