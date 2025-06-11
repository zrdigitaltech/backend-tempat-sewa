<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>quotation</title>
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
          <img src="assets/images/logo.png" width="200" alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang" />
        </td>
        <td class="w-half text-end">
          <h2>No Quotation: {{ $record->no_quotation }}</h2>
        </td>
      </tr>
    </table>

    <div class="margin-top">
      <table class="w-full">
        <tr>
          <td class="w-full text-center">
            <div><h4>Price Quotation</h4></div>
            <div>Nama Pemilik Kontrakan</div>
            <div>Jl. H. Mair No.22, Kota Tangerang</div>
            <div>0812-2888-3616</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="margin-top mb-2">
      <table class="w-full mb-2">
        <tr>
          <td class="w-half">
            <div>To: {{ $record->customer->name }} ({{ $record->customer->no_hp }})</div>
          </td>
          <td class="w-half text-end">
            <div>
              Tangerang,
              {{ \Carbon\Carbon::parse($record->quotation_date)->translatedFormat('d F Y') }}
            </div>
          </td>
        </tr>
      </table>
      <table class="products">
        <tr>
          <th class="text-left">Material Type</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        @foreach ($record->quotation_item as $item)
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

        @if (count($record->quotation_item) > 0)
          <tr class="items">
            <td class="text-end" colspan="2">Total Material type</td>
            <td class="text-end"><b>{{ number_format($sumPrice, 0) }}</b></td>
          </tr>
        @endif

        @if (count($record->quotation_another) > 0)
          @foreach ($record->quotation_another as $another)
            <tr class="items">
              <td>
                {{ $another['description'] }}
              </td>
              <td class="text-center">
                {{ $another['quantity'] }}
              </td>
              <td class="text-end">{{ number_format($another['price'], 0) }}</td>
            </tr>
          @endforeach
        @endif

        <tr class="items">
          <td class="text-end" colspan="2">
            <b>Total</b>
          </td>
          <td class="text-end"><b>{{ number_format($sumPriceMaterialAnother, 0) }}</b></td>
        </tr>
      </table>
    </div>

    @if ($record->notes)
      <div>
        <b>Note:</b>
        <br />
        {{ $record->notes }}
      </div>
    @endif

    {{-- <div><b>Note:</b> <br/>Transfer Rekening<br/>BCA 8015234527 a/n Zikri Ramdani</div> --}}

    <div class="footer margin-top">
      <div>Thank you</div>
      <div>www.NamaPemilikKontrakan.com</div>
    </div>
  </body>
</html>
