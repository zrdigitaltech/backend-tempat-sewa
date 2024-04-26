<?php

namespace App\Filament\Resources\PengeluaranResource\Pages;

use App\Filament\Resources\PengeluaranResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\Pengeluaran;
use App\Filament\Widgets\TotalPengeluaranWidget;

class ListPengeluarans extends ListRecords
{
  protected static string $resource = PengeluaranResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\CreateAction::make()];
  }

  // protected function getHeaderWidgets(): array
  // {
  //   return [
  //     TotalPengeluaranWidget::class,
  //   ];
  // }
}
