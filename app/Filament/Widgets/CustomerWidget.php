<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use Filament\Widgets\Widget;

class CustomerWidget extends Widget
{
  protected static string $view = 'filament.widgets.customer-widget';

  protected function getViewData(): array
  {
    $customerCount = Customer::count();

    return [
      'customerCount' => $customerCount,
    ];
  }
}
