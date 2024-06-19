<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FloatingWhatsapp extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'avatar',
    'phone_number',
    'account_name',
    'chat_message',
    'status_message',
  ];
}
