<?php

namespace App\Filament\Widgets;

use App\Models\Banner;
use Filament\Widgets\Widget;

class BannerWidget extends Widget
{
  protected static string $view = 'filament.widgets.banner-widget';

  protected function getViewData(): array
  {
    $bannerCount = Banner::count();

    return [
      'bannerCount' => $bannerCount,
    ];
  }
}
