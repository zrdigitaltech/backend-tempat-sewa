<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class Quotation extends Model
{
  use HasFactory;

  protected $fillable = [
    'customer_id',
    'no_quotation',
    'quotation_date',
    'quotation_item',
    'quotation_another',
    'notes',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'quotation_item' => 'array',
    'quotation_another' => 'array',
  ];

  public function customer()
  {
    return $this->belongsTo(Customer::class);
  }
}
