@if ($state)
    <x-icon
        name="heroicon-o-check-circle"
        class="w-5 h-5 stroke-success-600 text-success-600"
    />
@else
    <x-icon
        name="heroicon-o-x-circle"
        class="w-5 h-5 stroke-danger-600 text-danger-600"
    />
@endif
