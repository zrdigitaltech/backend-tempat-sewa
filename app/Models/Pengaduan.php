<?php

namespace App\Models;

use App\Notifications\PengaduanNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Notification;

class Pengaduan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['nama', 'no_telp', 'id_kontrakan', 'catatan', 'status'];
}
