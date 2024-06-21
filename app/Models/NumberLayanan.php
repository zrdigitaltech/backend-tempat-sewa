<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="ServiceNumber",
 *     type="object",
 *     title="Service Number",
 *     required={
 *         "tahun_pengalaman",
 *         "description_pengalaman",
 *         "certification_description",
 *         "operasional_description",
 *         "harga_wajar_description"
 *     },
 *     @OA\Property(
 *         property="tahun_pengalaman",
 *         type="string",
 *         description="Years of experience"
 *     ),
 *     @OA\Property(
 *         property="description_pengalaman",
 *         type="string",
 *         description="Description of experience"
 *     ),
 *     @OA\Property(
 *         property="certification_description",
 *         type="string",
 *         description="Certification description"
 *     ),
 *     @OA\Property(
 *         property="operasional_description",
 *         type="string",
 *         description="Operational description"
 *     ),
 *     @OA\Property(
 *         property="harga_wajar_description",
 *         type="string",
 *         description="Fair price description"
 *     )
 * )
 */
class NumberLayanan extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'tahun_pengalaman',
    'description_pengalaman',
    'certification_description',
    'operasional_description',
    'harga_wajar_description',
  ];
}
