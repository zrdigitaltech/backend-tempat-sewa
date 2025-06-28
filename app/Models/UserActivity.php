<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Notifications\AktivitasBaruNotification;

class UserActivity extends Model
{
  use HasFactory;

  public $timestamps = false;

  protected $fillable = ['user_id', 'aksi', 'keterangan', 'created_at'];

  protected $casts = [
        'created_at' => 'datetime',
    ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
