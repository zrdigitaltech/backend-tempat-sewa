<?php

namespace App\Observers;

use App\Models\Keanggotaan;
use Illuminate\Support\Facades\Auth;

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
