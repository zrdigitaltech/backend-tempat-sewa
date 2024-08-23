<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use App\Models\Pengeluaran;

class TotalPengeluaranWidget extends Widget
{
  protected static string $view = 'filament.widgets.total-pengeluaran-widget';

  // public function getTotalPengeluaran(): int
  // {
  //     return Pengeluaran::sum('jumlah_pengeluaran');
  // }
}
