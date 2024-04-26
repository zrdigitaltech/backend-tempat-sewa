<?php

namespace App\Observers;

use App\Models\Pengaduan;
use Filament\Notifications\Notification;

class PengaduanObserver
{
  public function created(Pengaduan $pengaduan): void
  {
    Notification::make()
      ->title('You have a new pengaduan' . $pengaduan->nama)
      ->sendToDatabase($pengaduan);
  }
}
