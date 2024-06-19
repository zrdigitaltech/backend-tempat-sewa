<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FloatingWhatsapp;

class FloatingWhatsappController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
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
      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Floating Whatsapp.',
          'error' => $e->getMessage(),
        ],
        500
      );
    }
  }
}
