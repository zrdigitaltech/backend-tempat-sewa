<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\UserActivity;

class LogUserLogin
{
  public function handle(Login $event): void
  {
    UserActivity::create([
      'user_id' => $event->user->id,
      'aksi' => 'Login',
      'keterangan' => 'User berhasil login',
    ]);
  }
}
