<?php

use Illuminate\Support\Facades\Route;

use App\Notifications\PengaduanNotification;
use Illuminate\Support\Facades\Notification;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
  return view('welcome');
});

Route::get('/{slug}', function () {
  return view('welcome');
});

Route::fallback(function () {
  return view('welcome');
});

Route::get('/test', function () {
  $user = auth()->user(); // Make sure you're authenticated
  $pengaduan = new \App\Models\Pengaduan([
      'nama' => 'Sample Name',
      'no_telp' => '1234567890',
      'id_kontrakan' => 'Sample Kontrakan',
      'catatan' => 'Sample Catatan',
      'status' => 'terbuka',
  ]);

  Notification::send($user, new PengaduanNotification($pengaduan));

  return 'Notification sent successfully';
})->middleware('auth');
