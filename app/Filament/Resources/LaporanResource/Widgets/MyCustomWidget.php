<?php

namespace App\Filament\Resources\LaporanResource\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Transaksi;
use Carbon\Carbon;

class MyCustomWidget extends BaseWidget
{
  protected function getStats(): array
  {
    // Calculate total pemasukan
    $totalPemasukan = Transaksi::sum('jumlah_pemasukan') ?? 0;

    // Calculate total pengeluaran
    $totalPengeluaran = Transaksi::sum('jumlah_pengeluaran') ?? 0;

    // Calculate pendapatan
    $pendapatan = $totalPemasukan - $totalPengeluaran;

    // Calculate previous month totals
    $previousMonth = Carbon::now()->subMonth();
    $previousMonthData = Transaksi::selectRaw(
      '
            SUM(jumlah_pemasukan) as pemasukan,
            SUM(jumlah_pengeluaran) as pengeluaran
        '
    )
      ->whereYear('tanggal', $previousMonth->year)
      ->whereMonth('tanggal', $previousMonth->month)
      ->first();

    $previousTotalPemasukan = $previousMonthData->pemasukan ?? 0;
    $previousTotalPengeluaran = $previousMonthData->pengeluaran ?? 0;

    // Calculate percentage changes
    $pemasukanChange =
      $previousTotalPemasukan > 0
        ? (($totalPemasukan - $previousTotalPemasukan) / $previousTotalPemasukan) * 100
        : 0;
    $pengeluaranChange =
      $previousTotalPengeluaran > 0
        ? (($totalPengeluaran - $previousTotalPengeluaran) / $previousTotalPengeluaran) * 100
        : 0;
    $pendapatanChange =
      $previousTotalPemasukan - $previousTotalPengeluaran != 0
        ? (($pendapatan - ($previousTotalPemasukan - $previousTotalPengeluaran)) /
            ($previousTotalPemasukan - $previousTotalPengeluaran)) *
          100
        : 0;

    // Format percentage changes without decimal places
    $formattedPemasukanChange = number_format($pemasukanChange, 0);
    $formattedPengeluaranChange = number_format($pengeluaranChange, 0);
    $formattedPendapatanChange = number_format($pendapatanChange, 0);

    $labels = $this->getMonthlyLabels();
    $pemasukanData = $this->getMonthlyData('jumlah_pemasukan');
    $pengeluaranData = $this->getMonthlyData('jumlah_pengeluaran');
    $pendapatanData = array_map(
      fn($pemasukan, $pengeluaran) => $pemasukan - $pengeluaran,
      $pemasukanData,
      $pengeluaranData
    );

    return [
      Stat::make('Total Pemasukan', 'Rp ' . number_format($totalPemasukan, 0, ',', '.'))
        ->icon('heroicon-o-currency-dollar')
        ->description(
          $formattedPemasukanChange .
            '% ' .
            ($pemasukanChange >= 0 ? 'naik' : 'turun') .
            ' dibandingkan bulan lalu'
        )
        ->descriptionIcon(
          $pemasukanChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down'
        )
        ->chart($pemasukanData)
        ->color($pemasukanChange >= 0 ? 'success' : 'danger'),
      Stat::make('Total Pengeluaran', 'Rp ' . number_format($totalPengeluaran, 0, ',', '.'))
        ->icon('heroicon-o-exclamation-circle')
        ->description(
          $formattedPengeluaranChange .
            '% ' .
            ($pengeluaranChange >= 0 ? 'naik' : 'turun') .
            ' dibandingkan bulan lalu'
        )
        ->descriptionIcon(
          $pengeluaranChange >= 0
            ? 'heroicon-m-arrow-trending-up'
            : 'heroicon-m-arrow-trending-down'
        )
        ->chart($pengeluaranData)
        ->color($pengeluaranChange >= 0 ? 'danger' : 'success'),
      Stat::make('Pendapatan', 'Rp ' . number_format($pendapatan, 0, ',', '.'))
        ->icon('heroicon-o-currency-dollar')
        ->description(
          $formattedPendapatanChange .
            '% ' .
            ($pendapatanChange >= 0 ? 'naik' : 'turun') .
            ' dibandingkan bulan lalu'
        )
        ->descriptionIcon(
          $pendapatanChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down'
        )
        ->chart($pendapatanData)
        ->color($pendapatanChange >= 0 ? 'success' : 'danger'),
    ];
  }

  protected function getMonthlyLabels(): array
  {
    $lastMonth = Carbon::now()->subMonth();
    $months = [];
    for ($i = 0; $i < 2; $i++) {
      $month = $lastMonth->addMonth()->format('M');
      $months[] = $month;
    }

    return $months;
  }

  protected function getMonthlyData(string $column): array
  {
    $lastMonth = Carbon::now()->subMonth();
    $monthlyData = Transaksi::selectRaw(
      '
        MONTH(tanggal) as month,
        SUM(' .
        $column .
        ') as value
    '
    )
      ->whereYear('tanggal', Carbon::now()->year)
      ->whereMonth('tanggal', '>=', $lastMonth->month)
      ->groupBy('month')
      ->get();

    $data = array_fill(0, 2, 0); // Adjust size as per the number of months

    foreach ($monthlyData as $entry) {
      $data[$entry->month - 1] = $entry->value;
    }

    return $data;
  }
}
