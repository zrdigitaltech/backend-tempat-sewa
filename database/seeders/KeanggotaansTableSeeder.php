<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KeanggotaansTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('keanggotaans')->insert([
            [
                'id_user' => 1,
                'id_paket_keanggotaan' => 1,
                'tanggal_mulai' => now(),
                'tanggal_berakhir' => null,
                'aktif' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
