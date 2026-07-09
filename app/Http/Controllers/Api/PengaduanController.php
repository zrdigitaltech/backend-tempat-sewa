<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengaduan;
use Illuminate\Support\Facades\Log;
use Filament\Notifications\Notification as FilamentNotification;
use Filament\Notifications\Actions\Action;
use App\Models\User;

class PengaduanController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/pengaduan",
   *     tags={"Pengaduan"},
   *     summary="Create data pengaduan",
   *     description="Returns list of pengaduan",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Pengaduan")
   *         )
   *     ),
   *     @OA\Response(
   *         response=500,
   *         description="Internal Server Error"
   *     )
   * )
   */
  public function store(Request $request)
  {
    try {
      // Validate the incoming request data
      $validated = $request->validate([
        // Add other fields as needed
        'nama' => 'required|string|max:255',
        'no_telp' => 'required|string|max:20', // Assuming phone numbers won't exceed 15 characters
        'id_properti' => 'required|string|max:255', // Adjust the max length as needed
        'catatan' => 'nullable|string', // Catatan can be nullable if it's not always required
        'status' => 'terbuka',
      ]);

      // Set default status to 'terbuka' if not provided
      // $validated['status'] = 'terbuka';

      // Create a new Pengaduan record
      // Map incoming id_properti to model attribute
      if (isset($validated['id_properti'])) {
        $validated['id_properti'] = $validated['id_properti'];
      }

      $pengaduan = Pengaduan::create($validated);

      // Get the authenticated user (assuming you have authentication in place)
      $user = User::all(); // auth()->user();
      // dd($user);

      // Generate the URL for viewing the Pengaduan
      $link = url("/admin/data-pengaduan/{$pengaduan->id}/view");

      // Send a Filament notification
      FilamentNotification::make()
        ->icon('heroicon-o-megaphone')
        ->title("Pengaduan dari <b>{$pengaduan->nama}</b>")
        ->body("Ada pengaduan baru dengan status 'terbuka'.")
        ->actions([
          Action::make('markAsRead')
            ->label('Lihat detail')
            ->url($link) // Add URL for redirection
            ->color('primary')
            ->markAsRead(),
          // ->extraAttributes([
          //   'x-data' => '{}', // Initialize Alpine.js data scope
          //   // 'x-on:click.prevent' => 'markAsRead(); window.location.reload();',
          //   'x-on:click.prevent' => 'markAsRead();',
          // ]),
        ])
        ->sendToDatabase($user); // Send the notification to the user's database

      // Return a response
      // return response()->json(['message' => 'Pengaduan created and notification sent successfully.']);
      return response()->json(
        [
          'code' => 200,
          'message' => 'Pengaduan dibuat dan notifikasi berhasil terkirim.',
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Gagal Pengaduan dibuat dan Mengirim Notifikasi Pengaduan: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Gagal Pengaduan dibuat dan Mengirim Notifikasi Pengaduan.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
