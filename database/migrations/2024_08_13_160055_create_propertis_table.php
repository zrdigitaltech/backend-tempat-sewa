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
    Schema::create('propertis', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->json('image');
      $table->string('nama')->unique();
      $table->string('slug', 255)->unique();
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
    Schema::dropIfExists('propertis');
  }
};
