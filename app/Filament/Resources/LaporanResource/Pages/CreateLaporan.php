<?php

namespace App\Filament\Resources\LaporanResource\Pages;

use App\Filament\Resources\LaporanResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;

class CreateLaporan extends CreateRecord
{
  protected static string $resource = LaporanResource::class;

  protected static bool $canCreateAnother = false;

  protected function handleRecordCreation(array $data): Model
  {
    $data['jenis_transaksi'] = $data['jenis_transaksi'] ?? 'pengeluaran';

    return static::getModel()::create($data);
  }

  public function getTitle(): string|Htmlable
  {
    return __('Buat Pengeluaran');
  }
}
