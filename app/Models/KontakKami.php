<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @OA\Schema(
 *     schema="ContactUs",
 *     type="object",
 *     title="Contact Us",
 *     required={"id", "title"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Contact Us"
 *     ),
 *     @OA\Property(
 *         property="alamat",
 *         type="string",
 *         description="Address"
 *     ),
 *     @OA\Property(
 *         property="jam_kerja",
 *         type="string",
 *         description="Working hours"
 *     ),
 *     @OA\Property(
 *         property="no_telp",
 *         type="string",
 *         description="Telephone number"
 *     ),
 *     @OA\Property(
 *         property="no_wa",
 *         type="string",
 *         description="WhatsApp number"
 *     ),
 *     @OA\Property(
 *         property="link_no_wa",
 *         type="string",
 *         description="WhatsApp link"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="Email address"
 *     ),
 *     @OA\Property(
 *         property="embed_google_map",
 *         type="string",
 *         description="Google Map embed link"
 *     ),
 *     @OA\Property(
 *         property="link_konfirmasi_wa",
 *         type="string",
 *         description="WhatsApp confirmation link"
 *     )
 * )
 */
class KontakKami extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'alamat',
    'jam_kerja',
    'no_telp',
    'no_wa',
    'link_no_wa',
    'email',
    'embed_google_map',
    'link_konfirmasi_wa',
  ];
}
