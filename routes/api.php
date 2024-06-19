<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AreaLayananController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\FloatingWhatsappController;
use App\Http\Controllers\Api\LogoController;
use App\Http\Controllers\Api\NumberLayananController;

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

Route::prefix('api')->group(function () {
  Route::get('/service-area', [AreaLayananController::class, 'index']);
  Route::get('/banner', [BannerController::class, 'index']);
  Route::get('/floating-whatsapp', [FloatingWhatsappController::class, 'index']);
  Route::get('/logos', [LogoController::class, 'index']);
  Route::get('/service-number', [NumberLayananController::class, 'index']);
});
