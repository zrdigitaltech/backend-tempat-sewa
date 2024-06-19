<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AreaLayananController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CallToActionController;
use App\Http\Controllers\Api\FloatingWhatsappController;
use App\Http\Controllers\Api\GaleriController;
use App\Http\Controllers\Api\KontakKamiController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\LogoController;
use App\Http\Controllers\Api\NumberLayananController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\TentangKamiController;
use App\Http\Controllers\Api\TestimoniController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get('/service-area', [AreaLayananController::class, 'index']);
Route::get('/banner', [BannerController::class, 'index']);
Route::get('/call-to-action', [CallToActionController::class, 'index']);
Route::get('/floating-whatsapp', [FloatingWhatsappController::class, 'index']);
Route::get('/galery', [GaleriController::class, 'index']);
Route::get('/contact-us', [KontakKamiController::class, 'index']);
Route::get('/services', [LayananController::class, 'index']);
Route::get('/logos', [LogoController::class, 'index']);
Route::get('/service-number', [NumberLayananController::class, 'index']);
Route::get('/payment', [PembayaranController::class, 'index']);
Route::get('/about-us', [TentangKamiController::class, 'index']);
Route::get('/testimonial', [TestimoniController::class, 'index']);
