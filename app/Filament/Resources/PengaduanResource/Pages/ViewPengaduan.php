<?php

namespace App\Filament\Resources\PengaduanResource\Pages;

use App\Filament\Resources\PengaduanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class ViewPengaduan extends EditRecord
{
  protected static string $resource = PengaduanResource::class;

  public function getTitle(): string|Htmlable
  {
    return __('View Data Pengaduan');
  }

  protected function getHeaderActions(): array
  {
    // return [Actions\EditAction::make()];
    return [
      Actions\EditAction::make() // Add the Edit button
        ->label('Edit') // Optional: Set a custom label for the button
        ->icon('heroicon-o-pencil') // Optional: Set a custom icon for the button
        ->url(fn() => $this->getResource()::getUrl('edit', ['record' => $this->record->getKey()])), // Navigate to the edit page
    ];
  }

  protected function getFormActions(): array
  {
    // Return an empty array to remove form actions like "Save" and "Cancel"
    return [];
  }
}
