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
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
  return redirect('/login');
});

Route::middleware(['web', 'guest'])->post('/api/v1/login', function (Request $request) {
  $request->validate([
    'email' => ['required', 'email'],
    'password' => ['required'],
  ]);

  if (!Auth::attempt($request->only('email', 'password'), true)) {
    return response()->json(['message' => 'Invalid credentials'], 401);
  }

  return response()->json(['message' => 'Logged in']);
});

// Kirim ulang email verifikasi
// Route::get('/email/verify', function () {
//     return view('auth.verify-email'); // ← bisa buat sendiri view-nya
// })->middleware('auth')->name('verification.notice');

// Link yang diklik dari email
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
  $request->fulfill();

  return redirect('/dashboard'); // atau ke halaman lain
})
  ->middleware(['auth', 'signed'])
  ->name('verification.verify');

// Resend verifikasi email
// Route::post('/email/verification-notification', function (Request $request) {
//     $request->user()->sendEmailVerificationNotification();

//     return back()->with('status', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Route::fallback(function () {
//   return view('welcome');
// });

// Route::get('/test', function () {
//   // Retrieve all Pengaduan records where the status is 'terbuka'
//   $pengaduans = Pengaduan::where('status', 'terbuka')->get();

//   // Get the authenticated user
//   $user = User::all(); // auth()->user();
//   // dd($user);

//   // Loop through each Pengaduan and send a notification
//   foreach ($pengaduans as $pengaduan) {
//     // Sending a Laravel notification
//     LaravelNotification::send($user, new PengaduanNotification($pengaduan));

//     // Generate URL for viewing the Pengaduan
//     $link = url("/admin/data-pengaduan/{$pengaduan->id}/view");

//     // Optionally, you can send a Filament notification
//     FilamentNotification::make()
//       ->icon('heroicon-o-megaphone')
//       ->title("Pengaduan dari <b>{$pengaduan->nama}</b>")
//       ->body("Ada pengaduan baru dengan status 'terbuka'.")
//       ->actions([
//         Action::make('markAsRead')
//           ->label('Lihat detail')
//           ->url($link) // Add URL for redirection
//           ->color('primary')
//           ->markAsRead()
//           // ->extraAttributes([
//           //   'x-data' => '{}', // Initialize Alpine.js data scope
//           //   'x-on:click.prevent' => 'markAsRead(); window.location.reload();',
//           // ]),
//         // ->extraAttributes([
//         //     'x-data' => '{}', // Initialize Alpine.js data scope
//         //     'x-on:click.prevent' => "
//         //         markAsRead();
//         //         \$dispatch('close-modal', { id: 'database-notifications' });
//         //     ",
//         // ])
//         // ->close()
//       ])
//       ->sendToDatabase($user); // Sends the notification to the user's database
//   }

//   return 'Notifications sent successfully';
// });

Route::get('/{any}', function () {
  return redirect('/login');
})->where('any', '.*');
