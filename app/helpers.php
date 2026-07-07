<?php

use App\Models\User;
use App\Models\UserActivity;
use App\Notifications\AktivitasBaruNotification;
use App\Models\PaketKeanggotaan;
use App\Models\Keanggotaan;

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

function beliAtauPerpanjangPaket(User $user, PaketKeanggotaan $paket, User $admin): Keanggotaan
{
  $now = now();

  // Cek apakah user sudah punya keanggotaan aktif
  $existing = Keanggotaan::where('id_user', $user->id)
    ->where('aktif', true)
    ->where('tanggal_berakhir', '>=', $now)
    ->first();

  if ($existing) {
    // Perpanjang
    $tanggalMulai = $existing->tanggal_berakhir->addDay();
  } else {
    $tanggalMulai = $now;
  }

  $tanggalBerakhir = $tanggalMulai->copy()->addMonths($paket->durasi_bulan);

  // Nonaktifkan keanggotaan lama
  Keanggotaan::where('id_user', $user->id)->update(['aktif' => false]);

  // Buat baru
  return Keanggotaan::create([
    'id_user' => $user->id,
    'id_paket_keanggotaan' => $paket->id,
    'tanggal_mulai' => $tanggalMulai,
    'tanggal_berakhir' => $tanggalBerakhir,
    'aktif' => true,
    'created_by' => $admin->id,
  ]);
}
