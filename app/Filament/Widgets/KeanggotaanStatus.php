<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Auth;

class KeanggotaanStatus extends Widget
{
    protected static string $view = 'filament.widgets.keanggotaan-status';

    protected function getViewData(): array
    {
        $user = Auth::user();
        $keang = $user?->keanggotaanAktif;

        return [
            'keanggotaan' => $keang,
            'user' => $user,
        ];
    }
}
