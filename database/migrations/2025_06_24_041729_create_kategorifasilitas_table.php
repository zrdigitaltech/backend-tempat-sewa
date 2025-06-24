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
    Schema::create('kategorifasilitas', function (Blueprint $table) {
      $table->id();
      $table->foreignId('tipeproperti_id')->constrained()->onDelete('cascade');
      $table->enum('jenis', ['lingkungan', 'interior']); // membedakan dua sumber
      $table->string('nama'); // e.g. "Fasilitas Umum", "Kamar Tidur"
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('kategoris');
  }
};
