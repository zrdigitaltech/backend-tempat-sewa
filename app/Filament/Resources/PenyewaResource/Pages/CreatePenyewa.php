<?php

namespace App\Filament\Resources\PenyewaResource\Pages;

use App\Filament\Resources\PenyewaResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\DB;
use App\Models\Transaksi;
use App\Models\Penyewa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Kontrakan;

class CreatePenyewa extends CreateRecord
{
  protected static string $resource = PenyewaResource::class;

  protected static bool $canCreateAnother = false;

  private function formatToInteger(?string $formattedValue): ?int
  {
    return $formattedValue ? (int) str_replace('.', '', $formattedValue) : null;
  }

  protected function handleRecordCreation(array $data): Model
  {
    // Create the Penyewa record
    $penyewa = static::getModel()::create($data);

    // Create the Transaksi record
    $transaksi = new Transaksi();
    $transaksi->id_penyewa = $penyewa->id; // Use the id from the newly created Penyewa record
    $transaksi->id_kontrakan = $data['id_kontrakan'];
    $transaksi->tipe_pembayaran = $data['tipe_pembayaran'];
    $transaksi->tanggal = $data['tanggal'];
    $transaksi->tgl_pembayaran_berikutnya = $data['tgl_pembayaran_berikutnya'];
    $transaksi->bayar_dp = $this->formatToInteger($data['bayar_dp'] ?? '');
    $transaksi->catatan = $data['catatan'];
    $transaksi->jumlah_pemasukan = $this->formatToInteger($data['jumlah_pemasukan'] ?? '');
    $transaksi->status_pembayaran = $data['status_pembayaran'];
    $transaksi->jenis_transaksi = 'pemasukan';

    // ubah the Kontrakan record
    $kontrakan = Kontrakan::find($data['id_kontrakan']);
    if ($kontrakan) {
      $kontrakan->status = 'tidak tersedia';
      $kontrakan->save(); // Save the updated Kontrakan record
    }
    // Set any other required fields for Transaksi here
    $transaksi->save();

    return $penyewa;
  }
}
