<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimoni;

class TestimoniController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
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
