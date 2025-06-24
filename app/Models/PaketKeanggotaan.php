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
  protected $fillable = ['nama', 'deskripsi', 'harga', 'durasi_bulan'];

  public function keanggotaans(): HasMany
  {
    return $this->hasMany(Keanggotaan::class, 'id_paketkeanggotaan');
  }
}
