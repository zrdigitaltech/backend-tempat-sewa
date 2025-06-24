@if ($record->email_verified_at !== null)
    <x-icon name="heroicon-o-check-circle" class="w-5 h-5 text-success-600" />
@else
    <x-icon name="heroicon-o-x-circle" class="w-5 h-5 text-danger-600" />
@endif
