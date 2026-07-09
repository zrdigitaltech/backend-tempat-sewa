<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penyewa extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'nama', 'no_telp', 'kartu_identitas'];

  public function transaksis()
  {
    return $this->hasMany(Transaksi::class, 'id_penyewa');
  }
}
