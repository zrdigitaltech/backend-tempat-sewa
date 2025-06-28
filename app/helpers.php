<?php

use App\Models\UserActivity;

function logUserActivity(string $aksi, ?string $keterangan = null, ?int $userId = null): void
{
    UserActivity::create([
        'user_id' => $userId ?? auth()->id(),
        'aksi' => $aksi,
        'keterangan' => $keterangan,
        'created_at' => now(),
    ]);
}
