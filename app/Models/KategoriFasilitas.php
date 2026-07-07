<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriFasilitas extends Model
{
  protected $fillable = ['tipe_properti_id', 'nama', 'jenis'];

  public function tipeProperti()
  {
    return $this->belongsTo(TipeProperti::class);
  }

  public function fasilitas()
  {
    return $this->hasMany(Fasilitas::class);
  }
}
