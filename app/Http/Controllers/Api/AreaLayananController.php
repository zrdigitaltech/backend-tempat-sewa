<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AreaLayanan;

class AreaLayananController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $areaLayanan = AreaLayanan::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Service Area.',
          'data' => $areaLayanan,
        ],
        200
      );
    } catch (\Exception $e) {
      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Service Area.',
          'error' => $e->getMessage(),
        ],
        500
      );
    }
  }
}
