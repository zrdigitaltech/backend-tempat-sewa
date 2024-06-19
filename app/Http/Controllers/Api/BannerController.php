<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
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
class BannerController extends Controller
{
  /**
   * @OA\GET(
   *     path="/api/v1/banner",
   *     tags={"Banner"},
   *     description="Description by Zikri Ramdani",
   *     @OA\Response(
   *         response=200,
   *         description="Successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Banner")
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
