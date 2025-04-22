<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersMembership extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['id_user', 'id_membership', 'start_date', 'end_date', 'is_active'];

  /**
   * Relasi ke model User.
   */
  public function user()
  {
    return $this->belongsTo(User::class, 'id_user');
  }

  /**
   * Relasi ke model Membership.
   */
  public function membership()
  {
    return $this->belongsTo(Membership::class, 'id_membership');
  }
}
