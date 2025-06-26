<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
  protected static string $resource = UserResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\DeleteAction::make()];
  }

  protected function getFormActions(): array
  {
    return [
      // Tombol Simpan
      Actions\Action::make('save')
        ->label('Simpan')
        ->submit('save')
        ->extraAttributes([
          'formnovalidate' => true,
        ])
        ->color('primary'),

      // Tombol Batal
      Actions\Action::make('cancel')
        ->label('Batal')
        ->url($this->getResource()::getUrl('index'))
        ->color('gray'),
    ];
  }
}
