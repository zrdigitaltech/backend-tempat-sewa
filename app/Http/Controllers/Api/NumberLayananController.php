<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NumberLayanan;
use Illuminate\Support\Facades\Log;

class NumberLayananController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/service-number",
   *     tags={"ServiceNumber"},
   *     summary="Get list of service-number",
   *     description="Returns list of service-number",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/ServiceNumber")
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
