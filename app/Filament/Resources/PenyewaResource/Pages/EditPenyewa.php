<?php

namespace App\Filament\Resources\PenyewaResource\Pages;

use App\Filament\Resources\PenyewaResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPenyewa extends EditRecord
{
  protected static string $resource = PenyewaResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\ViewAction::make()->label('Lihat Riwayat Transaksi')];
  }

  public function getRelationManagers(): array
  {
    return [];
  }
}
