<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @OA\Schema(
 *     schema="Properti",
 *     type="object",
 *     title="Properti",
 *     required={"id", "nama", "slug", "deskripsi", "harga_sewa", "status"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Properti"
 *     ),
 *     @OA\Property(
 *         property="image",
 *         type="array",
 *         @OA\Items(type="string"),
 *         description="Array of image URLs or paths"
 *     ),
 *     @OA\Property(
 *         property="alt",
 *         type="string",
 *         description="Alternative text for images"
 *     ),
 *     @OA\Property(
 *         property="nama",
 *         type="string",
 *         description="Name of the properti"
 *     ),
 *     @OA\Property(
 *         property="slug",
 *         type="string",
 *         description="URL-friendly slug for the properti"
 *     ),
 *     @OA\Property(
 *         property="deskripsi",
 *         type="string",
 *         description="Description of the propertin"
 *     ),
 *     @OA\Property(
 *         property="keterangan",
 *         type="string",
 *         description="Additional notes or remarks"
 *     ),
 *     @OA\Property(
 *         property="harga_sewa",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="durasi", type="integer", description="Duration in months"),
 *             @OA\Property(property="harga", type="integer", description="Price in IDR")
 *         ),
 *         description="Array of rental prices based on duration"
 *     ),
 *     @OA\Property(
 *         property="status",
 *         type="string",
 *         description="Status of the properti"
 *     )
 * )
 */
class Properti extends Model
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

  /**
   * Get the pengaduans for the properti.
   */
  public function pengaduans()
  {
    return $this->hasMany(Pengaduan::class, 'id_kontrakan');
  }

  public function transaksis()
  {
    return $this->hasMany(Transaksi::class, 'id_kontrakan');
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function boosterTransaksis(): HasMany
  {
    return $this->hasMany(BoosterTransaksi::class);
  }

  public function boosterAktif()
  {
    return $this->boosterTransaksis()
      ->where('status', 'aktif')
      ->where('tanggal_berakhir', '>=', now());
  }
}
