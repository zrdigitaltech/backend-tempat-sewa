<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Logo;
use Illuminate\Support\Facades\Log;

class LogoController extends Controller
{
  public function index()
  {
    try {
      $logos = Logo::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved logos.',
          'data' => $logos,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Logo: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Logo.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
