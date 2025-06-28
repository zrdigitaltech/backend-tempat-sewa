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

  // Kirim notifikasi ke super_admin (jika aksi tertentu)
  if (in_array($aksi, ['Perubahan Paket'])) {
    $adminUsers = User::whereHas('roles', function ($query) {
        $query->whereIn('name', ['super_admin', 'admin']);
    })->get();

    foreach ($adminUsers as $admin) {
        $admin->notify(new AktivitasBaruNotification($aksi, $keterangan ?? 'Tidak ada keterangan'));
    }
  }
}
