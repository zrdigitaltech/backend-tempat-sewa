<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifikasiEmailNotification;
use BezhanSalleh\FilamentShield\Traits\HasPanelShield;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Notifications\DatabaseNotification;

class User extends Authenticatable implements MustVerifyEmail, FilamentUser
{
  // Menggunakan trait untuk role/permission (Spatie), API token (Sanctum), notifikasi, factory
  use HasRoles, HasApiTokens, HasFactory, Notifiable;

  /**
   * Atribut yang diizinkan untuk diisi melalui mass-assignment (User::create([...]))
   * Tidak termasuk id_paketkeanggotaan karena keanggotaan disimpan di tabel terpisah
   */
  protected $fillable = [
    'name',
    'username',
    'email',
    'password',
    'avatar',
    'bio',
    'no_whatsapp',
    'socials',
    'created_by',
    'updated_by',
  ];

  /**
   * Atribut yang disembunyikan saat model diserialisasi (misalnya saat response API)
   */
  protected $hidden = ['password', 'remember_token'];

  /**
   * Atribut yang otomatis dikonversi tipenya saat diakses
   * - password akan otomatis di-hash saat diset
   * - email_verified_at akan dikonversi jadi instance Carbon (datetime)
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
    'socials' => 'array',
  ];

  /**
   * Relasi ke user yang membuat user ini
   * (berguna jika sistem Anda mendukung multi-admin / user management)
   */
  public function createdBy()
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  public function updatedBy()
  {
    return $this->belongsTo(User::class, 'updated_by');
  }

  /**
   * Mengambil satu keanggotaan yang aktif dari tabel keanggotaan
   * Biasanya dipakai untuk melihat status membership aktif user saat ini
   */
  public function keanggotaanAktif()
  {
    return $this->hasOne(Keanggotaan::class, 'id_user')->where('aktif', true);
  }

  /**
   * Relasi satu user memiliki banyak properti
   * (Digunakan untuk pemilik properti atau agen)
   */
  public function propertis(): HasMany
  {
    return $this->hasMany(Properti::class);
  }

  /**
   * Relasi satu user memiliki banyak transaksi booster
   * (Fitur untuk meningkatkan visibilitas iklan properti misalnya)
   */
  public function boosterTransaksis(): HasMany
  {
    return $this->hasMany(BoosterTransaksi::class);
  }

  // 👇 Jika Anda butuh semua histori keanggotaan, bisa tambahkan ini:
  public function keanggotaans(): HasMany
  {
    return $this->hasMany(Keanggotaan::class, 'id_user');
  }

  public function sendEmailVerificationNotification(): void
  {
    $this->notify(new VerifikasiEmailNotification());
  }

  public function getEmailVerifiedAttribute(): bool
  {
    return $this->email_verified_at !== null;
  }

  public function canAccessPanel(Panel $panel): bool
  {
    return true;
  }
}
