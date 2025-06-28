<?php

namespace App\Filament\Resources\TransaksiKeanggotaanResource\Pages;

use App\Filament\Resources\TransaksiKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTransaksiKeanggotaan extends EditRecord
{
  protected static string $resource = TransaksiKeanggotaanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\ViewAction::make(), Actions\DeleteAction::make()];
  }
}
