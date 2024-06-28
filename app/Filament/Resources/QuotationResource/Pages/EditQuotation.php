<?php

namespace App\Filament\Resources\QuotationResource\Pages;

use App\Filament\Resources\QuotationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Models\Quotation;
use Barryvdh\DomPDF\Facade\Pdf;

class EditQuotation extends EditRecord
{
  protected static string $resource = QuotationResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\Action::make('download')
        ->label('Download PDF')
        ->icon('heroicon-o-arrow-down-tray')
        ->action(function (Quotation $record) {
          // Convert $record->quotation_item to a collection
          $quotationItems = collect($record->quotation_item);

          // Calculate sum of prices
          $sumPrice = $quotationItems->sum('price');

          // Load the view with data including sumPrice
          $pdf = PDF::loadView('quotations.pdf', ['record' => $record, 'sumPrice' => $sumPrice]);

          return response()->streamDownload(
            fn() => print $pdf->stream(),
            "quotation_{$record->no_quotation}.pdf"
          );
        }),
      // Actions\DeleteAction::make()
    ];
  }
}
