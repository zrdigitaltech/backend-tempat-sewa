<?php

namespace App\Filament\Resources\TransaksiKeanggotaanResource\Pages;

use App\Filament\Resources\TransaksiKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTransaksiKeanggotaans extends ListRecords
{
  protected static string $resource = TransaksiKeanggotaanResource::class;

  protected function getHeaderActions(): array
  {
    return [
        // Actions\CreateAction::make(),
      ];
  }
}
