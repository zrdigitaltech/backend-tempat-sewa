<?php

namespace App\Observers;

use App\Models\Keanggotaan;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Filament\Notifications\Notification;
use App\Models\PaketKeanggotaan;
use Filament\Notifications\Actions\Action;

class KeanggotaanObserver
{
  /**
   * Handle the Keanggotaan "created" event.
   */
  public function creating(Keanggotaan $keanggotaan): void
  {
    if (Auth::check()) {
      $keanggotaan->created_by = Auth::id();
      $keanggotaan->updated_by = Auth::id();
    }
  }

  /**
   * Handle the Keanggotaan "updated" event.
   */
  public function updating(Keanggotaan $keanggotaan): void
  {
    if (Auth::check()) {
      $keanggotaan->updated_by = Auth::id();

      // Hanya jika field id_paketkeanggotaan berubah
      if ($keanggotaan->isDirty('id_paketkeanggotaan')) {
        $user = $keanggotaan->user;
        $username = $user?->username ?? 'User ID ' . $keanggotaan->id_user;

        $paketBaru = $keanggotaan->paket;
        $paketLama = PaketKeanggotaan::find($keanggotaan->getOriginal('id_paketkeanggotaan'));

        $namaPaketBaru = $paketBaru?->nama ?? '-';
        $namaPaketLama = $paketLama?->nama ?? '-';

        // Bandingkan level
        $levelBaru = $paketBaru?->level ?? 0;
        $levelLama = $paketLama?->level ?? 0;

        $status =
          $levelBaru > $levelLama
            ? 'Naik'
            : ($levelBaru < $levelLama
              ? 'Turun'
              : 'Perubahan');

        // Notifikasi ke user
        if ($user) {
          \Filament\Notifications\Notification::make()
            ->title("📦 {$status} Paket Keanggotaan")
            ->body("Paket Anda telah diubah dari {$namaPaketLama} menjadi {$namaPaketBaru}.")
            ->icon($status === 'Naik Paket' ? 'heroicon-o-bolt' : 'heroicon-o-arrow-down-tray')
            ->success()
            ->actions([
              Action::make('markAsRead')
                ->label('Tandai sudah dibaca')
                ->color('primary')
                ->markAsRead(),
            ])
            ->sendToDatabase($user);
        }

        // Notifikasi ke admin
        $admins = \App\Models\User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['admin', 'super_admin']);
        })
        ->where('id', '!=', auth()->id()) // <--- Tambahan: kecualikan user yang login
        ->get();

        foreach ($admins as $admin) {
          \Filament\Notifications\Notification::make()
            ->title("👤 {$status} Paket oleh {$username}")
            ->body("{$username} mengubah paket dari {$namaPaketLama} ke {$namaPaketBaru}.")
            ->icon('heroicon-o-adjustments-horizontal')
            ->success()
            ->actions([
              Action::make('markAsRead')
                ->label('Tandai sudah dibaca')
                ->color('primary')
                ->markAsRead(),
            ])
            ->sendToDatabase($admin);
        }
      }
    }
  }

  /**
   * Handle the Keanggotaan "deleted" event.
   */
  public function deleted(Keanggotaan $keanggotaan): void
  {
    //
  }

  /**
   * Handle the Keanggotaan "restored" event.
   */
  public function restored(Keanggotaan $keanggotaan): void
  {
    //
  }

  /**
   * Handle the Keanggotaan "force deleted" event.
   */
  public function forceDeleted(Keanggotaan $keanggotaan): void
  {
    //
  }
}
