<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Payment",
 *     type="object",
 *     title="Payment",
 *     required={
 *         "image",
 *         "alt",
 *         "no_rek",
 *         "nama_rek",
 *         "nama_bank"
 *     },
 *     @OA\Property(
 *         property="image",
 *         type="string",
 *         description="URL of the payment image"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alt text for the payment image"
 *     ),
 *     @OA\Property(
 *         property="no_rek",
 *         type="string",
 *         description="Bank account number"
 *     ),
 *     @OA\Property(
 *         property="nama_rek",
 *         type="string",
 *         description="Account holder's name"
 *     ),
 *     @OA\Property(
 *         property="nama_bank",
 *         type="string",
 *         description="Name of the bank"
 *     )
 * )
 */
class Pembayaran extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['image', 'alt', 'no_rek', 'nama_rek', 'nama_bank'];
}
