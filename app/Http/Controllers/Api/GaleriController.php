<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Galeri;
use Illuminate\Support\Facades\Log;

class GaleriController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/gallery",
   *     tags={"Gallery"},
   *     summary="Get list of gallery",
   *     description="Returns list of gallery",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Gallery")
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
      $galeri = Galeri::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Gallery.',
          'data' => $galeri,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Gallery: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Gallery.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
