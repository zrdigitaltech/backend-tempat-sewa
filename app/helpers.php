<?php

use App\Models\User;
use App\Models\UserActivity;
use App\Notifications\AktivitasBaruNotification;

function logUserActivity(string $aksi, ?string $keterangan = null, ?int $userId = null): void
{
  // Simpan aktivitas ke database
  UserActivity::create([
    'user_id' => $userId ?? auth()->id(),
    'aksi' => $aksi,
    'keterangan' => $keterangan,
    'created_at' => now(),
  ]);
}
