<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
  protected $fillable = ['kategori_fasilitas_id', 'nama'];

  public function kategoriFasilitas()
  {
    return $this->belongsTo(KategoriFasilitas::class);
  }

  public function tipeProperti()
  {
    return $this->hasOneThrough(
      TipeProperti::class,
      KategoriFasilitas::class,
      'id',
      'id',
      'kategori_fasilitas_id',
      'tipeproperti_id'
    );
  }
}
