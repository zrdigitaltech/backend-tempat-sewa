<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Services",
 *     type="object",
 *     title="Services",
 *     required={"id", "title"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Services"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="URL of the service image"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the service"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alt text for the service image"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description of the service"
 *     )
 * )
 */
class Layanan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'title', 'alt', 'description'];
}
