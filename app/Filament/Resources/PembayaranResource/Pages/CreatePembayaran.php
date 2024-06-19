<?php

namespace App\Filament\Resources\PembayaranResource\Pages;

use App\Filament\Resources\PembayaranResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\Pembayaran;
use Filament\Notifications\Notification;

class CreatePembayaran extends CreateRecord
{
    protected static string $resource = PembayaranResource::class;

    protected static bool $canCreateAnother = false;

    public function mount(): void
    {
      parent::mount();

      // Check the current count of records
      $recordCount = Pembayaran::count();
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
