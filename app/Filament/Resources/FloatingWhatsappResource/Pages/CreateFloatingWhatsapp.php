<?php

namespace App\Filament\Resources\FloatingWhatsappResource\Pages;

use App\Filament\Resources\FloatingWhatsappResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\FloatingWhatsapp;
use Filament\Notifications\Notification;

class CreateFloatingWhatsapp extends CreateRecord
{
  protected static string $resource = FloatingWhatsappResource::class;

  protected static bool $canCreateAnother = false;

  public function mount(): void
  {
    parent::mount();

    // Check the current count of records
    $recordCount = FloatingWhatsapp::count();
    if ($recordCount >= 1) {
      Notification::make()
        ->title('Limit Reached')
        ->danger()
        ->body('You cannot create more than 1 record.')
        ->send();

      $this->redirect($this->getResource()::getUrl('index'));
    }
  }
}
