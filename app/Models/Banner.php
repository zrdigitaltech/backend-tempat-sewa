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
 *         description="ID of the banner"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="Image of the banner"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the banner"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description of the banner"
 *     ),
 *     @OA\Property(
 *         property="title_wa",
 *         type="string",
 *         description="Title Whatsapp of the banner"
 *     ),
 *     @OA\Property(
 *         property="link_wa",
 *         type="string",
 *         description="Link Whatsapp of the banner"
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
