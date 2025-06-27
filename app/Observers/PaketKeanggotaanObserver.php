<?php

namespace App\Observers;

use App\Models\PaketKeanggotaan;
use Illuminate\Support\Facades\Auth;

class PaketKeanggotaanObserver
{
    /**
     * Handle the PaketKeanggotaan "created" event.
     */
    public function creating(PaketKeanggotaan $paketKeanggotaan): void
    {
        if (Auth::check()) {
            $paketKeanggotaan->created_by = Auth::id();
            $paketKeanggotaan->updated_by = Auth::id();
        }
    }

    /**
     * Handle the PaketKeanggotaan "updated" event.
     */
    public function updating(PaketKeanggotaan $paketKeanggotaan): void
    {
        if (Auth::check()) {
            $paketKeanggotaan->updated_by = Auth::id();
        }
    }

    /**
     * Handle the PaketKeanggotaan "deleted" event.
     */
    public function deleted(PaketKeanggotaan $paketKeanggotaan): void
    {
        //
    }

    /**
     * Handle the PaketKeanggotaan "restored" event.
     */
    public function restored(PaketKeanggotaan $paketKeanggotaan): void
    {
        //
    }

    /**
     * Handle the PaketKeanggotaan "force deleted" event.
     */
    public function forceDeleted(PaketKeanggotaan $paketKeanggotaan): void
    {
        //
    }
}
