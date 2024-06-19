<?php

namespace App\Filament\Resources\FloatingWhatsappResource\Pages;

use App\Filament\Resources\FloatingWhatsappResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFloatingWhatsapp extends EditRecord
{
  protected static string $resource = FloatingWhatsappResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }
}
