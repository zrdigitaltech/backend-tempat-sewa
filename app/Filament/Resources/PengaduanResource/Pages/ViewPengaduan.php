<?php

namespace App\Filament\Resources\PengaduanResource\Pages;

use App\Filament\Resources\PengaduanResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Contracts\Support\Htmlable;

class ViewPengaduan extends ViewRecord
{
  protected static string $resource = PengaduanResource::class;

  // public function getTitle(): string|Htmlable
  // {
  //     $capitalizedNama = ucwords(strtolower($this->record->nama)); // Capitalize each word in the nama

  //     // return __('Lihat data Pengaduan');
  //     return __('Lihat Pengaduan - :name', ['name' => $capitalizedNama]);
  // }

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

}
