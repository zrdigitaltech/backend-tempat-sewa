<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimoni;
use Illuminate\Support\Facades\Log;

class TestimoniController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/testimonial",
   *     tags={"Testimonial"},
   *     summary="Get list of testimonial",
   *     description="Returns list of testimonial",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/Testimonial")
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
      $testimoni = Testimoni::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Testimonial.',
          'data' => $testimoni,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Testimonial: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Testimonial.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
