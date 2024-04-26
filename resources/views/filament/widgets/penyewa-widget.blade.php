<x-filament-widgets::widget>
  <x-filament::section>
    {{-- Widget content --}}
    <a href="{{ route('filament.admin.resources.data-penyewa.index') }}">
      <h2 class="text-lg font-semibold">Total Penyewa</h2>
      <p class="text-xl mt-2">
        {{ $penyewaCount }}
      </p>
    </a>
  </x-filament::section>
</x-filament-widgets::widget>
