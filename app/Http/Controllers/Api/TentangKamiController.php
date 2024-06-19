<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TentangKami;
use Illuminate\Support\Facades\Log;

class TentangKamiController extends Controller
{
  public function index()
  {
    try {
      $tentangKami = TentangKami::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved About Me.',
          'data' => $tentangKami,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve About Us: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve About Us.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
