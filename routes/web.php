<?php

use Illuminate\Support\Facades\Route;

use App\Models\Pengaduan;
use App\Models\Kontrakan;
use App\Models\User;
use App\Notifications\PengaduanNotification;
use Illuminate\Support\Facades\Notification as LaravelNotification;
use Filament\Notifications\Notification as FilamentNotification;
use Illuminate\Support\Facades\URL;
use Filament\Notifications\Actions\Action;

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

// Route::fallback(function () {
//   return view('welcome');
// });

Route::get('/test', function () {
  // Retrieve all Pengaduan records where the status is 'terbuka'
  $pengaduans = Pengaduan::where('status', 'terbuka')->get();

  // Get the authenticated user
  $user = auth()->user();

  // Loop through each Pengaduan and send a notification
  foreach ($pengaduans as $pengaduan) {
    // Sending a Laravel notification
    LaravelNotification::send($user, new PengaduanNotification($pengaduan));

    // Generate URL for viewing the Pengaduan
    $link = url("/admin/data-pengaduan/{$pengaduan->id}/view");

    // Optionally, you can send a Filament notification
    FilamentNotification::make()
      ->icon('heroicon-o-megaphone')
      ->title("Pengaduan dari <b>{$pengaduan->nama}</b>")
      ->body("Ada pengaduan baru dengan status 'terbuka'.")
      ->actions([
        Action::make('markAsRead')
          ->label('Lihat detail')
          ->url($link) // Add URL for redirection
          ->color('primary')
          ->markAsRead()
          ->extraAttributes([
            'x-data' => '{}', // Initialize Alpine.js data scope
            'x-on:click.prevent' => 'markAsRead(); window.location.reload();',
          ]),
        // ->extraAttributes([
        //     'x-data' => '{}', // Initialize Alpine.js data scope
        //     'x-on:click.prevent' => "
        //         markAsRead();
        //         \$dispatch('close-modal', { id: 'database-notifications' });
        //     ",
        // ])
        // ->close()
      ])
      ->sendToDatabase($user); // Sends the notification to the user's database
  }

  return 'Notifications sent successfully';
})->middleware('auth');
