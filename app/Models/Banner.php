<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Banner",
 *     type="object",
 *     title="Banner",
 *     required={"id", "image", "title", "description", "title_wa", "link_wa"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the service area"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="Image of the service area"
 *     )
 * )
 */
class Banner extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'title', 'description', 'title_wa', 'link_wa'];
}
