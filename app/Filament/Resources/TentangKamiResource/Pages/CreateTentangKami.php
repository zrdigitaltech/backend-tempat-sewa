<?php

namespace App\Filament\Resources\TentangKamiResource\Pages;

use App\Filament\Resources\TentangKamiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Models\TentangKami;
use Filament\Notifications\Notification;

class CreateTentangKami extends CreateRecord
{
    protected static string $resource = TentangKamiResource::class;

    protected static bool $canCreateAnother = false;

    public function mount(): void
    {
        parent::mount();

        // Check the current count of records
        $recordCount = TentangKami::count();
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
