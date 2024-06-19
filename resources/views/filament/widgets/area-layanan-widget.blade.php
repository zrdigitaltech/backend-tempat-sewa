<x-filament-widgets::widget>
  <x-filament::section>
    <a href="{{ route('filament.admin.resources.service-area.index') }}" class="text-blue-600 hover:text-blue-800">
      <div class="text-gray-500">Total Service Area</div>
      <div class="text-2xl font-bold">
        {{ $areaLayananCount }}
      </div>
    </a>
  </x-filament::section>
</x-filament-widgets::widget>
