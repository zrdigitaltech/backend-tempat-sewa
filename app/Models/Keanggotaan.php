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
    'id_paketkeanggotaan',
    'tanggal_mulai',
    'tanggal_berakhir',
    'aktif',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'id_user');
  }

  public function paket(): BelongsTo
  {
    return $this->belongsTo(PaketKeanggotaan::class, 'id_paketkeanggotaan');
  }
}
