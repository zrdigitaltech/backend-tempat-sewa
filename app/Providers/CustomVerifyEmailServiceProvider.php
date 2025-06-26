<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use App\Notifications\VerifikasiEmailNotification;

class CustomVerifyEmailServiceProvider extends ServiceProvider
{
  public function boot(): void
  {
    VerifyEmail::toMailUsing(function ($notifiable, $url) {
      return (new VerifikasiEmailNotification())->toMail($notifiable);
    });
  }
}
