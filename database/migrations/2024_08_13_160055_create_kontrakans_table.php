<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('kontrakans', function (Blueprint $table) {
      $table->id();
      $table->json('image')->default('/assets/images/kontrakan-black.webp');
      $table->string('alt');
      $table->string('nama')->unique();
      $table->text('slug')->unique();
      $table->text('deskripsi');
      $table->text('keterangan')->nullable();
      $table->json('harga_sewa');
      $table->enum('status', ['tersedia', 'tidak tersedia']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('kontrakans');
  }
};
