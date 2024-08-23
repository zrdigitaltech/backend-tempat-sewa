<?php

namespace App\Models;

use App\Notifications\PengaduanNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * @OA\Schema(
 *     schema="Pengaduan",
 *     type="object",
 *     title="Pengaduan",
 *     required={"id", "nama", "no_telp", "id_kontrakan", "status"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the Pengaduan"
 *     ),
 *     @OA\Property(
 *         property="nama",
 *         type="string",
 *         description="Name of the person making the complaint"
 *     ),
 *     @OA\Property(
 *         property="no_telp",
 *         type="string",
 *         description="Phone number of the person making the complaint"
 *     ),
 *     @OA\Property(
 *         property="alamat",
 *         type="string",
 *         description="Address"
 *     ),
 *     @OA\Property(
 *         property="catatan",
 *         type="string",
 *         description="Additional notes or remarks"
 *     ),
 *     @OA\Property(
 *         property="status",
 *         type="string",
 *         description="Status of the complaint"
 *     ),
 * )
 */
class Pengaduan extends Model
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = ['nama', 'no_telp', 'id_kontrakan', 'catatan', 'status'];

  /**
   * Get the kontrakan associated with the pengaduan.
   */
  public function kontrakan()
  {
    return $this->belongsTo(Kontrakan::class, 'id_kontrakan');
  }
}
