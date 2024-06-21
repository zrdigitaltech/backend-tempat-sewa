<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Log;

class BannerController extends Controller
{
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
