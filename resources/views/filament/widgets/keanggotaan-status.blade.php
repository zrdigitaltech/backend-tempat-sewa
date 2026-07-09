<div class="p-4 border rounded bg-white">
  @if($keanggotaan)
    <h3 class="text-lg font-semibold">Keanggotaan Aktif</h3>
    <p class="text-sm">Paket: {{ $keanggotaan->paket->nama ?? '-' }}</p>
    <p class="text-sm">Mulai: {{ optional($keanggotaan->tanggal_mulai)->toDateString() }}</p>
    <p class="text-sm">Berakhir: {{ optional($keanggotaan->tanggal_berakhir)->toDateString() }}</p>
  @else
    <h3 class="text-lg font-semibold">Belum Berlangganan</h3>
    <p class="text-sm">Anda belum memiliki keanggotaan aktif. <a href="/checkout" class="underline">Lihat paket</a></p>
  @endif
</div>
