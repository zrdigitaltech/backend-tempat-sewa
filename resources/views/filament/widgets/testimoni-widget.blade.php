<x-filament-widgets::widget>
    <x-filament::section>
      <a href="{{ route('filament.admin.resources.testimonial.index') }}" class="text-blue-600 hover:text-blue-800">
        <div class="text-gray-500">Total Testimonial</div>
        <div class="text-2xl font-bold">
          {{ $TestimoniCount }}
        </div>
      </a>
    </x-filament::section>
</x-filament-widgets::widget>
