<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="HubungiKami",
 *     type="object",
 *     title="Hubungi Kami",
 *     required={"id", "title"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Hubungi Kami"
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
class HubungiKami extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['alamat', 'no_wa', 'link_no_wa', 'embed_google_map', 'link_konfirmasi_wa'];
}
