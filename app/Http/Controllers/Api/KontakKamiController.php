<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KontakKami;
use Illuminate\Support\Facades\Log;

class KontakKamiController extends Controller
{
  /**
   * @OA\Get(
   *     path="/api/v1/contact-us",
   *     tags={"Contact Us"},
   *     summary="Get list of contact us",
   *     description="Returns list of contact us",
   *     @OA\Response(
   *         response=200,
   *         description="successful operation",
   *         @OA\JsonContent(
   *             type="array",
   *             @OA\Items(ref="#/components/schemas/ContactUs")
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
      $kontakKami = KontakKami::all();

      return response()->json(
        [
          'code' => 200,
          'message' => 'Successfully retrieved Contact Us.',
          'data' => $kontakKami,
        ],
        200
      );
    } catch (\Exception $e) {
      Log::error('Failed to retrieve Contact Us: ' . $e->getMessage());

      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Contact Us.',
          'error' => 'Internal Server Error',
        ],
        500
      );
    }
  }
}
