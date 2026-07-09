<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyInformation extends Model
{
  protected $fillable = ['property_id', 'info_type', 'name', 'data'];

  protected $casts = ['data' => 'array'];

  public function property(): BelongsTo
  {
    return $this->belongsTo(Properti::class, 'property_id');
  }
}
