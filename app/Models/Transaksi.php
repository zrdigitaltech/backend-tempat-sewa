<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
  use HasFactory;

  protected $fillable = [
    'id_penyewa',
    'id_properti',
    'id_kategori',
    'tipe_pembayaran',
    'tanggal',
    'tgl_pembayaran_berikutnya',
    'bayar_dp',
    'catatan',
    'external_id',
    'fee',
    'id_settlement',
    'jumlah_pemasukan',
    'jumlah_pengeluaran',
    'jenis_transaksi',
    'status_pembayaran',
  ];

  // Cast fields to appropriate data types
  protected $casts = [
    'tanggal' => 'date',
    'tgl_pembayaran_berikutnya' => 'date',
  ];

  // Define relationships
  public function penyewa()
  {
    return $this->belongsTo(Penyewa::class, 'id_penyewa');
  }
  public function properti()
  {
    return $this->belongsTo(Properti::class, 'id_properti');
  }
}
