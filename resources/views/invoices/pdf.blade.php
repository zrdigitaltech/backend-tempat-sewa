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
      }
      table {
        width: 100%;
        border-spacing: 0;
      }
      table.products {
        font-size: 0.875rem;
      }
      table.products tr {
        background-color: rgb(96 165 250);
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
      }
    </style>
  </head>
  <body>
    <table class="w-full">
      <tr>
        <td class="w-half">
          <img src="{{ asset('assets/images/logo.png') }}" alt="Mekanik Elektro" width="200" />
        </td>
        <td class="w-half">
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
            <div>
              Jl. H. Mair No.22, Kota Tangerang
            </div>
            <div>0812-2888-3616</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="margin-top">
      <table class="products">
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        @foreach ($record->invoice_item as $item)
        <tr class="items">

            <td>
              {{ $item['description'] }}
            </td>
            <td>
              {{ $item['quantity'] }}
            </td>
            <td>Rp {{ number_format($item['price'], 2) }}</td>

        </tr>
        @endforeach
      </table>
    </div>

    <div class="total">Total: Rp {{ number_format($record->total, 2) }}</div>

    <div class="footer margin-top">
      <div>Thank you</div>
      <div>&copy; Mekanik Elektro</div>
    </div>
  </body>
</html>
