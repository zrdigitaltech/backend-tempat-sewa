<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CallToAction;
use Illuminate\Support\Facades\Log;

class CallToActionController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/call-to-action",
   *     tags={"Call To Action"},
   *     summary="Get list of call to action",
   *     description="Returns list of call to action",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/CallToAction")
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
      $callToAction = CallToAction::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Call To Action.',
          'data' => $callToAction,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Call To Action: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Call To Action.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
