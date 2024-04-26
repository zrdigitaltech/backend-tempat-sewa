<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FloatingWhatsapp;
use Illuminate\Support\Facades\Log;

class FloatingWhatsappController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/floating-whatsapp",
   *     tags={"Floating Whatsapp"},
   *     summary="Get list of floating whatsapp",
   *     description="Returns list of floating whatsapp",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/FloatingWhatsapp")
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
      $floatingWhatsapp = FloatingWhatsapp::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Floating Whatsapp.',
          'data' => $floatingWhatsapp,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Floating Whatsapp: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Floating Whatsapp.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
