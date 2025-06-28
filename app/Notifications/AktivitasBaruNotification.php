<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AktivitasBaruNotification extends Notification
{
    use Queueable;

    public string $aksi;
    public string $keterangan;

    public function __construct(string $aksi, string $keterangan)
    {
        $this->aksi = $aksi;
        $this->keterangan = $keterangan;
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'title' => "Aktivitas: {$this->aksi}",
            'body' => $this->keterangan,
            'url' => url('/user-activities'),
        ];
    }
}
