<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="CallToAction",
 *     type="object",
 *     title="Call To Action",
 *     required={"id", "title", "subtitle", "link_wa"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the call to action"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the call to action"
 *     ),
 *     @OA\Property(
 *         property="subtitle",
 *         type="string",
 *         description="Subtitle of the call to action"
 *     ),
 *     @OA\Property(
 *         property="link_wa",
 *         type="string",
 *         description="WhatsApp link for the call to action"
 *     )
 * )
 */
class CallToAction extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['title', 'subtitle', 'link_wa'];
}
