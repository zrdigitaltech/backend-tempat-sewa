<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Properti;
use Illuminate\Support\Facades\Log;

class KontrakanController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/kontrakan",
   *     tags={"Kontrakan"},
   *     summary="Get list of kontrakan",
   *     description="Returns list of kontrakan",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Kontrakan")
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
      $Kontrakan = Properti::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Kontrakan.',
          'data' => $Kontrakan,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Kontrakan: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Kontrakan.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
