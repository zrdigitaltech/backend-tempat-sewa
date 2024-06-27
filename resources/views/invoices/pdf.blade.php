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
    <link rel="stylesheet" href="{{ asset('assets/css/pdf.css') }}" type="text/css" />
  </head>
  <body>
    <table class="w-full">
      <tr>
        <td class="w-half">
          <img src="{{ asset('assets/images/logo.png') }}" alt="laravel daily" width="200" />
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
              Jl. H. Mair No.22, Kunciran Indah
              <br />
              Kota Tangerang
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
        <tr class="items">
          @foreach ($record->invoice_item as $item)
            <td>
              {{ $item['description'] }}
            </td>
            <td>
              {{ $item['quantity'] }}
            </td>
            <td>Rp {{ number_format($item['price'], 2) }}</td>
          @endforeach
        </tr>
      </table>
    </div>

    <div class="total">Total: Rp {{ number_format($record->total, 2) }}</div>

    <div class="footer margin-top">
      <div>Thank you</div>
      <div>&copy; Mekanik Elektro</div>
    </div>
  </body>
</html>
