<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Testimonial",
 *     type="object",
 *     title="Testimonial",
 *     required={
 *         "image",
 *         "alt",
 *         "name",
 *         "position",
 *         "description"
 *     },
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="URL of the testimonial image"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alt text for the testimonial image"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Name of the person giving the testimonial"
 *     ),
 *     @OA\Property(
 *         property="position",
 *         type="string",
 *         description="Position or title of the person"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Testimonial description or message"
 *     )
 * )
 */
class Testimoni extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'alt', 'name', 'position', 'description'];
}
