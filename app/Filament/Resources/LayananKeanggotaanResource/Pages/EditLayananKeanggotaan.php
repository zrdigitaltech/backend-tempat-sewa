<?php

namespace App\Filament\Resources\LayananKeanggotaanResource\Pages;

use App\Filament\Resources\LayananKeanggotaanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLayananKeanggotaan extends EditRecord
{
  protected static string $resource = LayananKeanggotaanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }
}
