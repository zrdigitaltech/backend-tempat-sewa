<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    $users = [
      [
        'id' => 1,
        'name' => 'Zikri Ramdani',
        'email' => 'zikriramdani.developer@gmail.com',
        'password' => bcrypt('zik123456ri'),
        'remember_token' => null,
      ],
    ];

    User::insert($users);
  }
}
