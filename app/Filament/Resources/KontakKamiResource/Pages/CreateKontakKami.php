<?php

namespace App\Filament\Resources\KontakKamiResource\Pages;

use App\Filament\Resources\KontakKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\KontakKami;
use Filament\Notifications\Notification;

class CreateKontakKami extends CreateRecord
{
    protected static string $resource = KontakKamiResource::class;

    protected static bool $canCreateAnother = false;

    public function mount(): void
    {
        parent::mount();

        // Check the current count of records
        $recordCount = KontakKami::count();
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
