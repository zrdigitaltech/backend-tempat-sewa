<?php

namespace App\Filament\Resources\TransaksiKeanggotaanResource\Widgets;

use Filament\Widgets\Widget;

class InvoiceTransaksiKeanggotaan extends Widget
{
  protected static string $view = 'filament.resources.widgets.invoice-transaksi-keanggotaan';

  public $record;

  public function mount(): void
  {
    $this->record = $this->getRecord();
  }
}
