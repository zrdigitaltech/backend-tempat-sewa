<?php

namespace App\Filament\Resources\PenyewaResource\Pages;

use App\Filament\Resources\PenyewaResource;
use Filament\Actions;
use Filament\Resources\Pages\{ViewRecord, EditRecord};
use App\Filament\Resources\PenyewaResource\RelationManagers\TransaksiRelationManager;

use App\Filament\Resources\PenyewaResource\RelationManagers;
use Illuminate\Contracts\Support\Htmlable;

class ViewPenyewa extends EditRecord
{
  protected static string $resource = PenyewaResource::class;
  protected static ?string $title = 'Lihat Penyewa';
  protected static ?string $breadcrumb = 'Lihat';
  protected static bool $canCreateAnother = false;

  protected function getHeaderActions(): array
  {
    return [
      Actions\EditAction::make()
        ->label('Ubah Data Penyewa')
        ->url(fn() => $this->getResource()::getUrl('edit', ['record' => $this->record->getKey()])),
    ];
  }

  protected function getFormActions(): array
  {
    // Return an empty array to remove the "Cancel" and "Save" buttons
    return [];
  }
}
