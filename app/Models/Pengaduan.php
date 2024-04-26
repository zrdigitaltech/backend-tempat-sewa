<?php

namespace App\Models;

use App\Notifications\PengaduanNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Pengaduan extends Model
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['nama', 'no_telp', 'id_kontrakan', 'catatan', 'status'];

  /**
   * Get the kontrakan associated with the pengaduan.
   */
  public function kontrakan()
  {
    return $this->belongsTo(Kontrakan::class, 'id_kontrakan', 'id');
  }
}
