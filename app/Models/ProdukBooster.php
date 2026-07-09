<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProdukBooster extends Model
{
  protected $fillable = [
    'nama',
    'deskripsi',
    'harga',
    'durasi_hari',
    'prioritas',
    'tampilkan_beranda',
  ];

  protected $casts = [
    'prioritas' => 'boolean',
    'tampilkan_beranda' => 'boolean',
    'durasi_hari' => 'integer',
    'harga' => 'integer',
  ];

  public function boosterTransaksis(): HasMany
  {
    return $this->hasMany(BoosterTransaksi::class);
  }
}
