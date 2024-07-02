<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Quotation;

class QuotationWidget extends Widget
{
  protected static string $view = 'filament.widgets.quotation-widget';

  protected function getViewData(): array
  {
    $QuotationCount = Quotation::count();

    return [
      'QuotationCount' => $QuotationCount,
    ];
  }
}
