<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
  use HasFactory;

  protected $fillable = [
    'id_penyewa',
    'id_kontrakan',
    'id_kategori',
    'tipe_pembayaran',
    'tanggal',
    'tgl_pembayaran_berikutnya',
    'bayar_dp',
    'catatan',
    'jumlah_pemasukan',
    'jumlah_pengeluaran',
    'jenis_transaksi',
    'status_pembayaran',
  ];

  // Cast fields to appropriate data types
  protected $casts = [
    'tgl_mulai' => 'date',
    'tgl_pembayaran_berikutnya' => 'date',
  ];

  // Define relationships
  public function penyewa()
  {
    return $this->belongsTo(Penyewa::class, 'id_penyewa');
  }

  public function kontrakan()
  {
    return $this->belongsTo(Kontrakan::class, 'id_kontrakan');
  }

  public function kategori()
  {
    return $this->belongsTo(Kategori::class, 'id_kategori');
  }
}
