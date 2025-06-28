<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Card;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Auth;

class AktivitasRingkasan extends StatsOverviewWidget
{
  protected static ?string $widgetId = 'AktivitasRingkasan';

  protected function getCards(): array
  {
    return [
      Card::make(
        'Login Hari Ini',
        UserActivity::where('aksi', 'Login')->whereDate('created_at', now())->count()
      ),

      Card::make('Aktivitas Hari Ini', UserActivity::whereDate('created_at', now())->count()),

      Card::make(
        'Paket Diubah',
        UserActivity::where('aksi', 'Perubahan Paket')->whereDate('created_at', now())->count()
      ),
    ];
  }

  public static function canView(): bool
  {
    return Auth::user()?->can('widget_AktivitasRingkasan');
  }
}
