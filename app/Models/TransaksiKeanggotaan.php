<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TransaksiKeanggotaan extends Model
{
  protected $fillable = [
    'id_user',
    'id_keanggotaan',
    'kode_transaksi',
    'jumlah',
    'status',
    'metode_pembayaran',
    'dibayar_pada',
    'expired_pada',
    'catatan',
    'created_by',
    'updated_by',
  ];

  protected $casts = [
    'dibayar_pada' => 'datetime',
    'expired_pada' => 'datetime',
    'jumlah' => 'integer',
  ];

  // Relasi
  public function user()
  {
    return $this->belongsTo(User::class, 'id_user');
  }

  public function keanggotaan()
  {
    return $this->belongsTo(Keanggotaan::class, 'id_keanggotaan');
  }

  protected static function booted(): void
  {
    static::creating(function ($model) {
      $model->kode_transaksi = $model->kode_transaksi ?? 'TRX-' . strtoupper(Str::random(8));
    });
  }
}
