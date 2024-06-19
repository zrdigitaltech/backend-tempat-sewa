<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Layanan;

class LayananController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $layanan = Layanan::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Services.',
          'data' => $layanan,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Services: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Services.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
