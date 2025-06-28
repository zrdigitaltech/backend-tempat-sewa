<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Filament\Facades\Filament;

class AktivitasBaruNotification extends Notification
{
  use Queueable;

  public string $aksi;
  public string $keterangan;

  /**
   * Create a new notification instance.
   */
  public function __construct(string $aksi, string $keterangan)
  {
    $this->aksi = $aksi;
    $this->keterangan = $keterangan;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via($notifiable): array
  {
    return ['database']; // bisa juga tambahkan 'mail'
  }

  /**
   * Get the mail representation of the notification.
   */
  public function toDatabase($notifiable)
  {
      return [
          'title' => "Aktivitas: {$this->aksi}",
          'body' => $this->keterangan,
          'url' => url('/user-activities'),
      ];
  }

  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array
  {
    return [
        //
      ];
  }
}
