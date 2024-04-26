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
use App\Http\Controllers\Api\KontakKamiController;
use App\Http\Controllers\Api\LogoController;
use App\Http\Controllers\Api\PembayaranController;

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

Route::group(['prefix' => 'v1'], function () {
  Route::get('/floating-whatsapp', [FloatingWhatsappController::class, 'index']);
  Route::get('/kontrakan', [KontrakanController::class, 'index']);
  Route::get('/contact-us', [KontakKamiController::class, 'index']);
  Route::get('/logos', [LogoController::class, 'index']);
  Route::get('/payment', [PembayaranController::class, 'index']);
});
