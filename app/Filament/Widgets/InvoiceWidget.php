<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Invoice;

class InvoiceWidget extends Widget
{
  protected static string $view = 'filament.widgets.invoice-widget';

  protected function getViewData(): array
  {
    $InvoiceCount = Invoice::count();

    return [
      'InvoiceCount' => $InvoiceCount,
    ];
  }
}
