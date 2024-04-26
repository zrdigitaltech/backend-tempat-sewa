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
      $table->json('image'); // To store multiple image URLs
      $table->string('alt'); // Alternative text for the image
      $table->string('nama')->unique(); // Ensure 'nama' is unique
      $table->text('slug')->unique();
      $table->text('deskripsi'); // Description of the kontrakan
      $table->text('keterangan')->nullable(); // Additional notes (can be null)
      $table->json('harga_sewa'); // To store pricing information
      $table->enum('status', ['tersedia', 'tidak tersedia']); // Status of the kontrakan
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
