<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Log;

class BannerController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/banner",
   *     tags={"Banner"},
   *     summary="Get list of banner",
   *     description="Returns list of banner",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Banner")
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
      $banner = Banner::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Banner.',
          'data' => $banner,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Banner: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Banner.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
