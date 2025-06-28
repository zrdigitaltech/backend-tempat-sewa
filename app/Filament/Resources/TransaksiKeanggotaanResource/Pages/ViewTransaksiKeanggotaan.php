<?php

namespace App\Filament\Resources\TransaksiKeanggotaanResource\Pages;

use App\Filament\Resources\TransaksiKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewTransaksiKeanggotaan extends ViewRecord
{
  protected static string $resource = TransaksiKeanggotaanResource::class;
  protected static string $recordTitleAttribute = 'kode_transaksi';

  protected function getHeaderActions(): array
  {
    return [
        // Actions\EditAction::make(),
      ];
  }
}
