<?php

namespace App\Filament\Resources\PembayaranResource\Pages;

use App\Filament\Resources\PembayaranResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\Pembayaran;

class ListPembayarans extends ListRecords
{
    protected static string $resource = PembayaranResource::class;

    protected function getHeaderActions(): array
    {
      $actions = [];

      if (Pembayaran::count() < 1) {
        $actions[] = Actions\CreateAction::make();
      }

      return $actions;
    }
}
