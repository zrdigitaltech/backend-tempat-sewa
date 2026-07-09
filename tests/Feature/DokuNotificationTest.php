<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\PaketKeanggotaan;
use App\Models\Transaksi;

class DokuNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_legacy_webcheckout_notification_creates_keanggotaan()
    {
        // Create user and package
        $user = User::factory()->create();
        $paket = PaketKeanggotaan::create([
            'nama' => 'Premium Test',
            'deskripsi' => 'Test paket',
            'harga' => 50000,
            'durasi_bulan' => 3,
        ]);

        $orderId = 'DOKU-PKG' . $paket->id . '-123456';
        $amount = number_format($paket->harga, 2, '.', '');

        // Create transaksi pending
        Transaksi::create([
            'catatan' => $orderId . '|user:' . $user->id,
            'external_id' => $orderId,
            'jumlah_pemasukan' => $paket->harga,
            'status_pembayaran' => 'tertunda',
            'tanggal' => now(),
            'jenis_transaksi' => 'pemasukan',
        ]);

        // Configure DOKU legacy settings
        config([
            'doku.mall_id' => 'MALL123',
            'doku.shared_key' => 'SHAREDSECRET',
        ]);

        $words = sha1(config('doku.mall_id') . $orderId . $amount . config('doku.shared_key'));

        $response = $this->post('/doku/notification', [
            'TRANSIDMERCHANT' => $orderId,
            'AMOUNT' => $amount,
            'WORDS' => $words,
            'STATUS' => 'SUCCESS',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('keanggotaans', [
            'id_user' => $user->id,
            'id_paket_keanggotaan' => $paket->id,
            'aktif' => 1,
        ]);
    }
}
