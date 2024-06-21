<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="AboutUs",
 *     type="object",
 *     title="About Us",
 *     required={
 *         "image",
 *         "alt",
 *         "description"
 *     },
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="URL of the image"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alt text for the image"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description about us"
 *     )
 * )
 */
class TentangKami extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'alt', 'description'];
}
