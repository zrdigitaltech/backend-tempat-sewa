<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
  protected $fillable = ['nama', 'deskripsi'];

  public function transaksis()
  {
    return $this->hasMany(Transaksi::class, 'id_kategori');
  }
}
