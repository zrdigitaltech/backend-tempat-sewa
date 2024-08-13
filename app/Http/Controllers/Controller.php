<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     description="API documentation for Nama Pemilik Kontrakan application",
 *     @OA\Contact(
 *         email="zikriramdani.developer@gmail.com"
 *     )
 * )
 */
class Controller extends BaseController
{
  use AuthorizesRequests, ValidatesRequests;
}
