<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="AreaLayanan",
 *     type="object",
 *     title="Area Layanan",
 *     required={"id", "title"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the service area"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Title of the service area"
 *     )
 * )
 */
class AreaLayanan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['title'];
}
