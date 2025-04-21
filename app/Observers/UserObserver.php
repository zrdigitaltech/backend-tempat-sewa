<?php

namespace App\Observers;

use Illuminate\Support\Facades\Auth; // Tambahkan ini
use App\Models\User;
use App\Models\Membership;
use App\Models\UsersMembership;

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

  public function created(User $user)
    {
        // Assuming the ID of the "basic" membership is 1
        UsersMembership::create([
            'id_user' => $user->id,
            'id_membership' => 1, // Replace 1 with the actual ID of the "basic" membership
            'start_date' => now(),
            'is_active' => true,
        ]);
    }
}
