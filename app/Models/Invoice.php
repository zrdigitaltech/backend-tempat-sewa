<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class Invoice extends Model
{
  use HasFactory;

  protected $fillable = ['customer_id', 'no_invoice', 'invoice_date', 'invoice_item'];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'invoice_item' => 'array',
  ];

  public function customer()
  {
    return $this->belongsTo(Customer::class);
  }
}
