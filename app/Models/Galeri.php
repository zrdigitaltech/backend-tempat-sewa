<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Gallery",
 *     type="object",
 *     title="Gallery",
 *     required={"id", "title", "image", "width", "height", "alt", "tags", "description"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Gallery"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the Gallery"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         format="binary",
 *         description="Image URL of the Gallery"
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
 *         description="Tags associated with the Gallery"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description of the Gallery"
 *     )
 * )
 */
class Galeri extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['title', 'image', 'width', 'height', 'alt', 'tags', 'description'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'tags' => 'array',
    ];
}

