<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\DatabaseMessage;

class KeanggotaanAktifNotification extends Notification
{
    use Queueable;

    protected $paketName;
    protected $tanggalMulai;
    protected $tanggalBerakhir;

    public function __construct(string $paketName, $tanggalMulai, $tanggalBerakhir)
    {
        $this->paketName = $paketName;
        $this->tanggalMulai = $tanggalMulai;
        $this->tanggalBerakhir = $tanggalBerakhir;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Keanggotaan Anda Aktif')
            ->greeting('Halo ' . ($notifiable->name ?? ''))
            ->line("Keanggotaan Anda pada paket '{$this->paketName}' telah aktif.")
            ->line('Mulai: ' . ($this->tanggalMulai ? $this->tanggalMulai->toDateString() : '-'))
            ->line('Berakhir: ' . ($this->tanggalBerakhir ? $this->tanggalBerakhir->toDateString() : '-'))
            ->action('Lihat Paket', url('/paket-keanggotaan'))
            ->line('Terima kasih telah berlangganan.');
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Keanggotaan Aktif',
            'message' => "Paket {$this->paketName} aktif hingga " . ($this->tanggalBerakhir ? $this->tanggalBerakhir->toDateString() : '-'),
            'paket' => $this->paketName,
            'mulai' => $this->tanggalMulai?->toDateString(),
            'berakhir' => $this->tanggalBerakhir?->toDateString(),
        ];
    }
}
