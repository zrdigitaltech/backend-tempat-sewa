<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Invoice</title>
    <style>
      h4 {
        margin: 0;
      }
      .w-full {
        width: 100%;
      }
      .w-half {
        width: 50%;
      }
      .margin-top {
        margin-top: 1.25rem;
      }
      .footer {
        font-size: 0.875rem;
        padding: 1rem;
        background-color: rgb(241 245 249);
        text-align: center;
      }
      table {
        width: 100%;
        border-spacing: 0;
      }
      table.products {
        font-size: 0.875rem;
      }
      table.products tr {
        background-color: #f47629; /*rgb(96 165 250);*/
      }
      table.products th {
        color: #ffffff;
        padding: 0.5rem;
      }
      table tr.items {
        background-color: rgb(241 245 249);
      }
      table tr.items td {
        padding: 0.5rem;
      }
      .total {
        text-align: right;
        margin-top: 1rem;
        font-size: 0.875rem;
        padding-right: 0.5rem;
      }
      .text-left {
        text-align: left;
      }
      .text-center {
        text-align: center;
      }
      .text-end {
        text-align: right;
      }
      .text-danger {
        color: red;
      }
      .mb-0 {
        margin-bottom: 0;
      }
      .mb-2 {
        margin-bottom: 0.5rem;
      }
      .mb-3 {
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <table class="w-full">
      <tr>
        <td class="w-half">
          <img src="assets/images/logo_pdf.png" alt="Mekanik Elektro" width="200" />
        </td>
        <td class="w-half text-end">
          <h2>No Invoice: {{ $record->no_invoice }}</h2>
        </td>
      </tr>
    </table>

    <div class="margin-top">
      <table class="w-full">
        <tr>
          <td class="w-half">
            <div><h4>To:</h4></div>
            <div>{{ $record->customer->name }}</div>
            <div>{{ $record->customer->alamat }}</div>
            <div>{{ $record->customer->no_hp }}</div>
          </td>
          <td class="w-half">
            <div><h4>From:</h4></div>
            <div>Mekanik Elektro</div>
            <div>Jl. H. Mair No.22, Kota Tangerang</div>
            <div>0812-2888-3616</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="margin-top">
      <table class="w-full mb-2">
        <tr>
          <td class="w-half">
            <div>
              Tangerang,
              {{ \Carbon\Carbon::parse($record->invoice_date)->translatedFormat('d F Y') }}
            </div>
          </td>
        </tr>
      </table>
      <table class="products mb-2">
        <tr>
          <th class="text-left">Description</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        @foreach ($record->invoice_item as $item)
          <tr class="items">
            <td>
              {{ $item['description'] }}
            </td>
            <td class="text-center">
              {{ $item['quantity'] }}
            </td>
            <td class="text-end">{{ number_format($item['price'], 0) }}</td>
          </tr>
        @endforeach

        <tr class="items">
          <td class="text-end" colspan="2">
            <b>Total</b>
          </td>
          <td class="text-end"><b>{{ number_format($sumPrice, 0) }}</b></td>
        </tr>
      </table>
    </div>
    <div>
      <b>Note:</b>
      @if ($record->notes)
        <br />
        {{ $record->notes }}
      @endif

      <br />
      Transfer Rekening
      <br />
      BCA 8015234527 a/n Zikri Ramdani
    </div>

    <div class="footer margin-top">
      <div>Thank you</div>
      <div>www.MekanikElektro.com</div>
    </div>
  </body>
</html>
