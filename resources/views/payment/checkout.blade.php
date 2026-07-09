<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Checkout | tempatSewa</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container py-5">

    <div class="row justify-content-center">
        <div class="col-lg-8">

            <div class="card border-0 shadow-lg rounded-4">

                <div class="card-body p-5">

                    <div class="text-center mb-5">
                        <h2 class="fw-bold text-primary mb-2">
                            🏠 tempatSewa
                        </h2>

                        <h4 class="fw-semibold">
                            Checkout Keanggotaan
                        </h4>

                        <p class="text-muted mb-0">
                            Pilih paket keanggotaan yang sesuai dengan kebutuhan Anda.
                        </p>
                    </div>

                    @if(isset($packages) && $packages->count())

                        @foreach($packages as $paket)

                            <div class="card border mb-3 rounded-4 shadow-sm">

                                <div class="card-body">

                                    <div class="d-flex justify-content-between align-items-center flex-wrap">

                                        <div>
                                            <h5 class="fw-bold mb-2">
                                                {{ $paket->nama }}
                                            </h5>

                                            <span class="badge bg-light text-dark border">
                                                Paket Keanggotaan
                                            </span>
                                        </div>

                                        <div class="text-end mt-3 mt-md-0">

                                            <h3 class="text-primary fw-bold mb-3">
                                                Rp {{ number_format($paket->harga, 0, ',', '.') }}
                                            </h3>

                                            <form method="POST" action="/payment">
                                                @csrf

                                                <input
                                                    type="hidden"
                                                    name="order_id"
                                                    value="DOKU-PKG{{ $paket->id }}-{{ time() }}"
                                                >

                                                <input
                                                    type="hidden"
                                                    name="amount"
                                                    value="{{ (int) $paket->harga }}"
                                                >

                                                <button class="btn btn-primary px-4">
                                                    💳 Bayar Sekarang
                                                </button>
                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        @endforeach

                    @else

                        <div class="alert alert-primary rounded-4">

                            <div class="fw-semibold">
                                Nomor Pesanan
                            </div>

                            <div>
                                {{ $orderId }}
                            </div>

                        </div>

                        <div class="card bg-light border rounded-4 mb-4">

                            <div class="card-body text-center">

                                <small class="text-muted">
                                    Total Pembayaran
                                </small>

                                <h2 class="fw-bold text-primary mt-2 mb-0">
                                    Rp {{ number_format($amount, 0, ',', '.') }}
                                </h2>

                            </div>

                        </div>

                        <form method="POST" action="/payment">

                            @csrf

                            <input
                                type="hidden"
                                name="order_id"
                                value="{{ $orderId }}"
                            >

                            <input
                                type="hidden"
                                name="amount"
                                value="{{ $amount }}"
                            >

                            <button class="btn btn-primary btn-lg w-100">
                                💳 Lanjutkan Pembayaran
                            </button>

                        </form>

                    @endif

                </div>

            </div>

            <div class="text-center mt-4 text-muted small">
                © {{ date('Y') }} tempatSewa <br>
                Pembayaran diproses secara aman melalui <strong>DOKU Payment Gateway</strong>.
            </div>

        </div>
    </div>

</div>

</body>
</html>