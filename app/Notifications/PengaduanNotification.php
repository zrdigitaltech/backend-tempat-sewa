<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Pengaduan;

class PengaduanNotification extends Notification
{
  use Queueable;

  protected Pengaduan $pengaduan;

  public function __construct(Pengaduan $pengaduan)
  {
    $this->pengaduan = $pengaduan;
  }

  public function via($notifiable)
  {
    return ['database'];
  }

  // public function toMail($notifiable)
  // {
  //     return (new MailMessage)
  //                 ->line('A new complaint has been submitted.')
  //                 ->action('View Complaint', url('/pengaduan/'.$this->pengaduan->id))
  //                 ->line('Thank you for using our application!');
  // }

  public function toArray($notifiable): array
  {
    return [
      'nama' => $this->pengaduan->nama,
      'no_telp' => $this->pengaduan->no_telp,
      'id_properti' => $this->pengaduan->id_properti,
      'status' => $this->pengaduan->status,
    ];
  }

  public function getNotifiableType(): string
  {
    return 'App\Models\Pengaduan';
  }
}
