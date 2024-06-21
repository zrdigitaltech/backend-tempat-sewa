<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Logo",
 *     type="object",
 *     title="Logo",
 *     required={"id", "image", "alt"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the logo"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="URL of the logo image"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alt text for the logo image"
 *     )
 * )
 */
class Logo extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'alt'];
}
