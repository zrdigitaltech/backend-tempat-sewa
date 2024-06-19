<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Logo;

class LogoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
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
      // Tangani jika terjadi exception
      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve logos.',
          'error' => $e->getMessage(),
        ],
        500
      );
    }
  }
}
