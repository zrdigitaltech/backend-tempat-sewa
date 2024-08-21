<?php

namespace App\Filament\Resources\PengaduanResource\Pages;

use App\Filament\Resources\PengaduanResource;
use App\Models\Pengaduan;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;

class ListPengaduans extends ListRecords
{
  protected static string $resource = PengaduanResource::class;

  protected function getHeaderActions(): array
  {
    // return [Actions\CreateAction::make()];
    return [];
  }

  public function getTabs(): array
  {
    // Define tabs for each status with counts
    $tabs = [
      'all' => Tab::make('All'),
      // ->badge(Pengaduan::count()),

      'terbuka' => Tab::make('Terbuka')
        // ->badge(Pengaduan::where('status', 'terbuka')->count())
        ->modifyQueryUsing(fn($query) => $query->where('status', 'terbuka')),

      'sedang-dalam-proses' => Tab::make('Sedang Dalam Proses')
        // ->badge(Pengaduan::where('status', 'sedang dalam proses')->count())
        ->modifyQueryUsing(fn($query) => $query->where('status', 'sedang dalam proses')),

      'tertutup' => Tab::make('Tertutup')
        // ->badge(Pengaduan::where('status', 'tertutup')->count())
        ->modifyQueryUsing(fn($query) => $query->where('status', 'tertutup')),
    ];

    return $tabs;
  }
}
