<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KontakKami;

class KontakKamiController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $kontakKami = KontakKami::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Contact Us.',
          'data' => $kontakKami,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Contact Us: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Contact Us.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
