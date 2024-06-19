<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;

class BannerController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
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
      return response()->json(
        [
          'code' => 500,
          'message' => 'Failed to retrieve Banner.',
          'error' => $e->getMessage(),
        ],
        500
      );
    }
  }
}
