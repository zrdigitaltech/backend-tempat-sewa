<?php

namespace App\Filament\Resources\LogoResource\Pages;

use App\Filament\Resources\LogoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\Logo;
use Filament\Notifications\Notification;

class CreateLogo extends CreateRecord
{
  protected static string $resource = LogoResource::class;

  protected static bool $canCreateAnother = false;

  public function mount(): void
  {
    parent::mount();

    // Check the current count of records
    $recordCount = Logo::count();
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
