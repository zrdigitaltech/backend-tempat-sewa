<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Redirecting to DOKU</title>
  </head>
  <body>
    <p>Redirecting to payment gateway...</p>
    <form id="dokuForm" action="{{ $endpoint }}" method="POST">
      @foreach($payload as $k => $v)
        <input type="hidden" name="{{ $k }}" value="{{ $v }}">
      @endforeach
      <noscript>
        <button type="submit">Continue to payment</button>
      </noscript>
    </form>

    <script>
      document.getElementById('dokuForm').submit();
    </script>
  </body>
  </html>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Redirecting to Doku</title>
  </head>
  <body>
    <p>Redirecting to payment...</p>
    <form id="doku-form" method="POST" action="{{ $endpoint }}">
      @foreach($payload as $k => $v)
        <input type="hidden" name="{{ $k }}" value="{{ $v }}">
      @endforeach
    </form>
    <script>document.getElementById('doku-form').submit();</script>
  </body>
</html>
