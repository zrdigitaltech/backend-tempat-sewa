<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AreaLayanan;
use Illuminate\Support\Facades\Log;

class AreaLayananController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/service-area",
   *     tags={"Service Area"},
   *     summary="Get list of service area",
   *     description="Returns list of service area",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/ServiceArea")
   *         )
   *     ),
   *     @OA\Response(
   *         response=500,
   *         description="Internal Server Error"
   *     )
   * )
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
      Log::error('Failed to retrieve Service Area: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Service Area.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
