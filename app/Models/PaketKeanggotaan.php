<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaketKeanggotaan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'nama',
    'deskripsi',
    'harga',
    'durasi_bulan',
    'maksimal_properti',
    'maksimal_iklan',
    'harga_awal',
    'diskon_persen',
    'created_by',
    'updated_by',
  ];

  protected $with = ['createdBy', 'updatedBy'];

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

  public function keanggotaans(): HasMany
  {
    return $this->hasMany(Keanggotaan::class, 'id_paket_keanggotaan');
  }
}
