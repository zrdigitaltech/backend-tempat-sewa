<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HubungiKami;
use Illuminate\Support\Facades\Log;

class HubungiKamiController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/contact-us",
   *     tags={"Hubungi Kami"},
   *     summary="Get list of Hubungi Kami",
   *     description="Returns list of Hubungi Kami",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/HubungiKami")
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
      $hubungiKami = HubungiKami::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Hubungi Kami.',
          'data' => $hubungiKami,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Hubungi Kami: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Hubungi Kami.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
