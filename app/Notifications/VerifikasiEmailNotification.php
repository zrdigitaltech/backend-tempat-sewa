<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\VerifyEmail;

class VerifikasiEmailNotification extends VerifyEmail
{
  public function toMail($notifiable): MailMessage
  {
    $url = $this->verificationUrl($notifiable);

    return (new MailMessage())
      ->subject('Verifikasi Alamat Email Anda')
      ->greeting('Halo!')
      ->line('Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda.')
      ->action('Verifikasi Email', $url)
      ->line('Jika Anda tidak mendaftarkan akun, abaikan email ini.');
  }
}
