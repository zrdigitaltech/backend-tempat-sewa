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
    Schema::create('paket_keanggotaans', function (Blueprint $table) {
      $table->id();
      $table->string('nama'); // Contoh: "Premium", "Gratis", "Gold"
      $table->text('deskripsi')->nullable(); // Penjelasan manfaat/paket
      $table->integer('harga'); // Dalam rupiah
      $table->integer('durasi_bulan'); // Lama aktif keanggotaan

      $table->integer('maksimal_properti')->nullable();
      $table->integer('maksimal_iklan')->nullable();

      // Tambahan
      $table->integer('harga_awal')->nullable(); // Harga saat langganan pertama
      $table->integer('diskon_persen')->nullable(); // Persentase diskon awal (contoh: 20 untuk 20%)

      $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
      $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('paket_keanggotaans');
  }
};
