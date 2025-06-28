<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Keanggotaan;
use Carbon\Carbon;

class ExpireKeanggotaanCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'keanggotaan:expire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ubah paket keanggotaan menjadi Gratis jika tanggal berakhir sudah lewat';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();

        $total = Keanggotaan::whereNot('id_paketkeanggotaan', 2)
            ->whereDate('tanggal_berakhir', '<', $today)
            ->update([
                'id_paketkeanggotaan' => 2,
            ]);

        $this->info("Total keanggotaan yang diubah: {$total}");
    }
}
