<?php

namespace App\Filament\Resources\KontrakanResource\Pages;

use App\Filament\Resources\KontrakanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKontrakan extends EditRecord
{
  protected static string $resource = KontrakanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }
}
