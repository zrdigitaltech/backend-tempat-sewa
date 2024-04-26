<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluaran extends Model
{
  use HasFactory;

  protected $fillable = [
    'tanggal',
    'id_kontrakan',
    'id_kategori',
    'keterangan',
    'jumlah_pengeluaran',
  ];

  public function kontrakan()
  {
    return $this->belongsTo(Kontrakan::class, 'id_kontrakan', 'id');
  }

  public function kategori()
  {
    return $this->belongsTo(Kategori::class, 'id_kategori', 'id');
  }
}
