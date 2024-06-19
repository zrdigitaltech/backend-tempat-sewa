<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FloatingWhatsapp;
use Illuminate\Support\Facades\Log;

class FloatingWhatsappController extends Controller
{
  public function index()
  {
    try {
      $floatingWhatsapp = FloatingWhatsapp::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Floating Whatsapp.',
          'data' => $floatingWhatsapp,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Floating Whatsapp: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Floating Whatsapp.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
