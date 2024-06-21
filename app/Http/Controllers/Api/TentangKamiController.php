<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TentangKami;
use Illuminate\Support\Facades\Log;

class TentangKamiController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/about-us",
   *     tags={"About Us"},
   *     summary="Get list of about us",
   *     description="Returns list of about us",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/AboutUs")
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
      $tentangKami = TentangKami::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved About Me.',
          'data' => $tentangKami,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve About Us: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve About Us.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
