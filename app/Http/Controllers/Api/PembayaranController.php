<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pembayaran;

class PembayaranController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $pembayaran = Pembayaran::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Payment.',
          'data' => $pembayaran,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Payment: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Payment.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
