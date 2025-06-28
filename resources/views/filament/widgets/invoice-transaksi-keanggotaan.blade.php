<div class="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
  <h2 class="text-xl font-bold mb-4">Invoice Pembayaran</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div>
      <p>
        <strong>Kode Transaksi:</strong>
        {{ $record->kode_transaksi }}
      </p>
      <p>
        <strong>Status:</strong>
        <span
          class="px-2 py-1 rounded text-white @if ($record->status === "sukses")
              bg-green-600
          @elseif ($record->status === "pending")
              bg-yellow-500
          @elseif ($record->status === "gagal")
              bg-red-600
          @else
              bg-gray-500
          @endif"
        >
          {{ strtoupper($record->status) }}
        </span>
      </p>
      <p>
        <strong>Metode:</strong>
        {{ $record->metode_pembayaran ?? "-" }}
      </p>
    </div>
    <div>
      <p>
        <strong>Jumlah Dibayar:</strong>
        Rp{{ number_format($record->jumlah, 0, ",", ".") }}
      </p>
      <p>
        <strong>Dibayar Pada:</strong>
        {{ $record->dibayar_pada?->format("d M Y H:i") ?? "-" }}
      </p>
      <p>
        <strong>Expired:</strong>
        {{ $record->expired_pada?->format("d M Y H:i") ?? "-" }}
      </p>
    </div>
  </div>

  @if ($record->catatan)
    <div class="mt-4 text-sm">
      <p>
        <strong>Catatan:</strong>
        {{ $record->catatan }}
      </p>
    </div>
  @endif
</div>
