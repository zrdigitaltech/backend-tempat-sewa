<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Kontrakan",
 *     type="object",
 *     title="Kontrakan",
 *     required={"id", "title", "image", "width", "height", "alt", "tags", "description"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Kontrakan"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the Kontrakan"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         format="binary",
 *         description="Image URL of the Kontrakan"
 *     ),
 *     @OA\Property(
 *         property="width",
 *         type="integer",
 *         description="Width of the image"
 *     ),
 *     @OA\Property(
 *         property="height",
 *         type="integer",
 *         description="Height of the image"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alternative text for the image"
 *     ),
 *     @OA\Property(
 *         property="tags",
 *         type="array",
 *         @OA\Items(type="string"),
 *         description="Tags associated with the Kontrakan"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description of the Kontrakan"
 *     )
 * )
 */
class Kontrakan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'image',
    'alt',
    'nama',
    'slug',
    'deskripsi',
    'keterangan',
    'harga_sewa',
    'status',
  ];

  protected $casts = [
    'image' => 'array',
    'harga_sewa' => 'array',
  ];
}
