<?php

namespace App\Filament\Resources\KeanggotaanResource\Pages;

use App\Filament\Resources\KeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKeanggotaan extends EditRecord
{
  protected static string $resource = KeanggotaanResource::class;

  // protected function getHeaderActions(): array
  // {
  //   return [Actions\DeleteAction::make()];
  // }
}
