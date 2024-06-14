<?php

namespace App\Filament\Resources\NumberLayananResource\Pages;

use App\Filament\Resources\NumberLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNumberLayanan extends EditRecord
{
  protected static string $resource = NumberLayananResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }
}
