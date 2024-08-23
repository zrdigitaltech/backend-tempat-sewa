<?php

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     description="API documentation for the application",
 *     @OA\Contact(
 *         email="zikriramdani.developer@gmail.com"
 *     )
 * )
 */

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\FloatingWhatsappController;
use App\Http\Controllers\Api\KontrakanController;
use App\Http\Controllers\Api\HubungiKamiController;
use App\Http\Controllers\Api\LogoController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\PengaduanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::prefix('v1')->group(function () {
  Route::controller(FloatingWhatsappController::class)->group(function () {
    Route::get('/floating-whatsapp', 'index');
  });

  Route::controller(KontrakanController::class)->group(function () {
    Route::get('/kontrakan', 'index');
  });

  Route::controller(HubungiKamiController::class)->group(function () {
    Route::get('/hubungi-kami', 'index');
  });

  Route::controller(LogoController::class)->group(function () {
    Route::get('/logos', 'index');
  });

  Route::controller(PembayaranController::class)->group(function () {
    Route::get('/payment', 'index');
  });

  Route::controller(PengaduanController::class)->group(function () {
    // Route::get('/pengaduan', 'index');
    Route::post('/pengaduan', 'store');
  });
});
