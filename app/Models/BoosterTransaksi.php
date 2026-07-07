<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BoosterTransaksi extends Model
{
  protected $fillable = [
    'user_id',
    'properti_id',
    'produk_booster_id',
    'tanggal_mulai',
    'tanggal_berakhir',
    'status',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function properti(): BelongsTo
  {
    return $this->belongsTo(Properti::class);
  }

  public function produk(): BelongsTo
  {
    return $this->belongsTo(ProdukBooster::class, 'produk_booster_id');
  }
}
