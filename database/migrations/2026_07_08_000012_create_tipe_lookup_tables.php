<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('tipe_kost')) {
      Schema::create('tipe_kost', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }
    if (!Schema::hasTable('tipe_kamar')) {
      Schema::create('tipe_kamar', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }
    if (!Schema::hasTable('tipe_sewa')) {
      Schema::create('tipe_sewa', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('tipe_sewa');
    Schema::dropIfExists('tipe_kamar');
    Schema::dropIfExists('tipe_kost');
  }
};
