<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AreaLayanan;
use Illuminate\Support\Facades\Log;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     description="API documentation for the application",
 *     @OA\Contact(
 *         email="zikriramdani.developer@gmail.com"
 *     )
 * )
 */
class AreaLayananController extends Controller
{
  /**
   * @OA\GET(
   *     path="/api/v1/service-area",
   *     tags={"Service Area"},
   *     description="Description by Zikri Ramdani",
   *     @OA\Response(
   *         response=200,
   *         description="Successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/AreaLayanan")
   *         )
   *     ),
   *     @OA\Response(
   *         response=500,
   *         description="Internal Server Error"
   *     )
   *  )
   *
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
