<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NumberLayanan;

class NumberLayananController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $numberLayanan = NumberLayanan::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Service Number.',
          'data' => $numberLayanan,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Service Number: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Service Number.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
