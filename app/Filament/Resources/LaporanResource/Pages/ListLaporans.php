<?php

namespace App\Filament\Resources\LaporanResource\Pages;

use App\Filament\Resources\LaporanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Models\Transaksi;
use App\Filament\Resources\LaporanResource\Widgets\TotalPemasukanWidget;
use App\Filament\Resources\LaporanResource\Widgets\TotalPengeluaranWidget;
use App\Filament\Resources\LaporanResource\Widgets\TotalPendapatanWidget;
use Illuminate\Contracts\Support\Htmlable;

use App\Filament\Resources\LaporanResource\Widgets\MyCustomWidget;

class ListLaporans extends ListRecords
{
  protected static string $resource = LaporanResource::class;

  protected function getHeaderActions(): array
  {
    return [Actions\CreateAction::make()->label('Tambah Pengeluaran')];
  }

  public function getTitle(): string|Htmlable
  {
    return __('Laporan');
  }

  public function getHeaderWidgetsColumns(): int|array
  {
    return 1;
  }

  protected function getHeaderWidgets(): array
  {
    return [MyCustomWidget::class];
  }
}
