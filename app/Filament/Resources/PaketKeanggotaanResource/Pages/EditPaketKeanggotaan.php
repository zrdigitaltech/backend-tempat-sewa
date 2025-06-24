<?php

namespace App\Filament\Resources\PaketKeanggotaanResource\Pages;

use App\Filament\Resources\PaketKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPaketKeanggotaan extends EditRecord
{
  protected static string $resource = PaketKeanggotaanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }
}
