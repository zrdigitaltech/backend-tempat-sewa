<?php

namespace App\Filament\Resources\NumberLayananResource\Pages;

use App\Filament\Resources\NumberLayananResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use App\Models\NumberLayanan;

class CreateNumberLayanan extends CreateRecord
{
    protected static string $resource = NumberLayananResource::class;

    protected static bool $canCreateAnother = false;

    public function mount(): void
    {
        parent::mount();

        // Check the current count of records
        $recordCount = NumberLayanan::count();
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
