<?php

namespace App\Filament\Resources\UsersMembershipResource\Pages;

use App\Filament\Resources\UsersMembershipResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUsersMembership extends EditRecord
{
    protected static string $resource = UsersMembershipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
