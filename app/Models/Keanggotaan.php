<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Keanggotaan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'id_user',
    'id_paket_keanggotaan',
    'tanggal_mulai',
    'tanggal_berakhir',
    'aktif',
    'created_by',
    'updated_by',
  ];

  protected $with = ['createdBy', 'updatedBy'];

  protected $casts = [
    'tanggal_mulai' => 'date',
    'tanggal_berakhir' => 'date',
    'aktif' => 'boolean',
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

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'id_user');
  }

  public function paket(): BelongsTo
  {
    return $this->belongsTo(PaketKeanggotaan::class, 'id_paket_keanggotaan');
  }

  public function getSisaHariAttribute()
  {
    if (!$this->tanggal_berakhir) {
      return '-';
    }

    $tanggalBerakhir = \Carbon\Carbon::parse($this->tanggal_berakhir);
    $today = \Carbon\Carbon::today();

    $sisa = $today->diffInDays($tanggalBerakhir, false);

    return $sisa < 0 ? 'Sudah berakhir' : $sisa . ' hari';
  }

  protected static function booted()
  {
    static::updated(function (Keanggotaan $keanggotaan) {
      if ($keanggotaan->isDirty('id_paket_keanggotaan')) {
        $user = $keanggotaan->user;
        $username = $user?->username ?? 'User ID ' . $keanggotaan->id_user;

        $paketBaru = $keanggotaan->paket;
        $paketLama = \App\Models\PaketKeanggotaan::find(
          $keanggotaan->getOriginal('id_paket_keanggotaan')
        );

        $namaPaketBaru = $paketBaru?->nama ?? '-';
        $namaPaketLama = $paketLama?->nama ?? '-';

        // Log aktivitas
        \App\Models\UserActivity::create([
          'user_id' => $keanggotaan->id_user,
          'aksi' => 'Perubahan Paket',
          'keterangan' => "Dari {$namaPaketLama} ke {$namaPaketBaru}",
          'created_at' => now(),
        ]);
      }
    });
  }

  public function transaksi()
  {
    return $this->hasOne(Transaksi::class, 'id_keanggotaan');
  }
}
