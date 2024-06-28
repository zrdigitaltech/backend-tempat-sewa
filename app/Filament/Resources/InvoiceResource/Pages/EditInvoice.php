<?php

namespace App\Filament\Resources\InvoiceResource\Pages;

use App\Filament\Resources\InvoiceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;

class EditInvoice extends EditRecord
{
  protected static string $resource = InvoiceResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\Action::make('download')
        ->label('Download PDF')
        ->icon('heroicon-o-arrow-down-tray')
        ->action(function (Invoice $record) {
          // Convert $record->invoice_item to a collection
          $invoiceItems = collect($record->invoice_item);

          // Calculate sum of prices
          $sumPrice = $invoiceItems->sum('price');

          // Load the view with data including sumPrice
          $pdf = PDF::loadView('invoices.pdf', ['record' => $record, 'sumPrice' => $sumPrice]);

          return response()->streamDownload(
            fn() => print $pdf->stream(),
            "invoice_{$record->no_invoice}.pdf"
          );
        }),
      // Actions\DeleteAction::make()
    ];
  }
}
