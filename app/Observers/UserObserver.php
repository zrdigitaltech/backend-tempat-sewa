<?php

namespace App\Observers;

use App\Models\Keanggotaan;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserObserver
{
  /**
   * Event ini dijalankan sebelum data user disimpan ke database (saat membuat user).
   * Di sini kita menambahkan informasi siapa yang membuat user ini.
   */
  public function creating(User $user)
  {
    // Jika ada user yang sedang login, set kolom created_by pada model User
    if (Auth::check()) {
      $user->created_by = Auth::id();
      $user->updated_by = Auth::id();
    }
  }

  /**
   * Event ini dijalankan sebelum data user di-update ke database.
   * Kita menambahkan informasi siapa yang terakhir mengubah data user.
   */
  public function updating(User $user)
  {
    // Set kolom updated_by dengan ID user yang sedang login
    if (Auth::check()) {
      $user->updated_by = Auth::id();
    }
  }

  /**
   * Event ini dijalankan setelah user berhasil dibuat di database.
   * Kita langsung membuat data keanggotaan default untuk user baru.
   */
  public function created(User $user)
  {
    // Buat entri keanggotaan default (paket keanggotaan ID 2, misalnya "Gratis")
    Keanggotaan::create([
      'id_user' => $user->id, // ID user baru
      'id_paket_keanggotaan' => 1, // ID paket keanggotaan default (ubah sesuai kebutuhan)
      'tanggal_mulai' => now(), // Tanggal mulai keanggotaan = sekarang
      'aktif' => true, // Tandai sebagai keanggotaan aktif
    ]);
  }
}
