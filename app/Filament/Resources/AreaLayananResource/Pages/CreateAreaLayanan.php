<?php

namespace App\Filament\Resources\AreaLayananResource\Pages;

use App\Filament\Resources\AreaLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\AreaLayanan;
use Filament\Notifications\Notification;

class CreateAreaLayanan extends CreateRecord
{
  protected static string $resource = AreaLayananResource::class;

  protected static bool $canCreateAnother = false;

  public function mount(): void
  {
    parent::mount();

    // Check the current count of records
    $recordCount = AreaLayanan::count();
    if ($recordCount >= 5) {
      Notification::make()
        ->title('Limit Reached')
        ->danger()
        ->body('You cannot create more than 5 record.')
        ->send();

      $this->redirect($this->getResource()::getUrl('index'));
    }
  }
}
