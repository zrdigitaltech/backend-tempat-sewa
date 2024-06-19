<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CallToAction;

class CallToActionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
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
