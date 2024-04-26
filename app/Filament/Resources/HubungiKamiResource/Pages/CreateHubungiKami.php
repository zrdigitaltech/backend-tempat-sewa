<?php

namespace App\Filament\Resources\HubungiKamiResource\Pages;

use App\Filament\Resources\HubungiKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\HubungiKami;
use Filament\Notifications\Notification;

class CreateHubungiKami extends CreateRecord
{
  protected static string $resource = HubungiKamiResource::class;

  protected static bool $canCreateAnother = false;

  public function mount(): void
  {
    parent::mount();

    // Check the current count of records
    $recordCount = HubungiKami::count();
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
