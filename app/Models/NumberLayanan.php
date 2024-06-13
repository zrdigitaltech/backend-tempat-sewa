<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
      'harga_wajar_description'
    ];
}
