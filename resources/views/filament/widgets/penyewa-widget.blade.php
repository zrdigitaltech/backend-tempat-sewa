<x-filament-widgets::widget>
  <x-filament::section>
    {{-- Widget content --}}
    <a
      href="{{ route('filament.admin.resources.data-penyewa.index') }}"
      class="text-blue-600 hover:text-blue-800"
    >
      <div class="text-gray-500">Total Penyewa</div>
      <div class="text-2xl font-bold">
        {{ $penyewaCount }}
      </div>
    </a>
  </x-filament::section>
</x-filament-widgets::widget>
