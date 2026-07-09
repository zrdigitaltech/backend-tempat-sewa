<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Owner extends Model
{
  protected $fillable = ['user_id', 'name', 'slug', 'avatar', 'bio', 'whatsapp', 'socials', 'is_verified', 'stats', 'area_specialist', 'property_types'];

  protected $casts = [
    'socials' => 'array',
    'stats' => 'array',
    'property_types' => 'array',
    'is_verified' => 'boolean',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function properties()
  {
    return $this->hasMany(Properti::class, 'owner_id');
  }
}
