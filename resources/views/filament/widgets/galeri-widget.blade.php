<x-filament-widgets::widget>
    <x-filament::section>
      <a href="{{ route('filament.admin.resources.gallery.index') }}" class="text-blue-600 hover:text-blue-800">
        <div class="text-gray-500">Total Gallery</div>
        <div class="text-2xl font-bold">
          {{ $GaleriCount }}
        </div>
      </a>
    </x-filament::section>
</x-filament-widgets::widget>
