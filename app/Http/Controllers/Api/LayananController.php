<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Layanan;
use Illuminate\Support\Facades\Log;

class LayananController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/services",
   *     tags={"Services"},
   *     summary="Get list of services",
   *     description="Returns list of services",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Services")
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
