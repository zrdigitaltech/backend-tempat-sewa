<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Auth; // Tambahkan ini

class UserObserver
{
  public function creating(User $user)
  {
    $user->created_by = Auth::check() ? Auth::id() : null;
  }

  public function updating(User $user)
  {
    $user->updated_by = Auth::check() ? Auth::id() : null;
  }
}
