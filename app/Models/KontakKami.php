<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
      'link_konfirmasi_wa'
    ];
}
