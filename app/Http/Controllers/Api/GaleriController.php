<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Galeri;
use Illuminate\Support\Facades\Log;

class GaleriController extends Controller
{
  public function index()
  {
    try {
      $galeri = Galeri::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Gallery.',
          'data' => $galeri,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Gallery: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Gallery.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
