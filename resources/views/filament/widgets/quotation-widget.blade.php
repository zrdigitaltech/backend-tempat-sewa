<x-filament-widgets::widget>
  <x-filament::section>
    <a
      href="{{ route('filament.admin.resources.quotations.index') }}"
      class="text-blue-600 hover:text-blue-800"
    >
      <div class="text-gray-500">Total Quotation</div>
      <div class="text-2xl font-bold">
        {{ $QuotationCount }}
      </div>
    </a>
  </x-filament::section>
</x-filament-widgets::widget>
