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
    Schema::create('booster_transaksis', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('properti_id')->constrained('propertis')->onDelete('cascade');
      $table->foreignId('produk_booster_id')->constrained('produk_boosters')->onDelete('cascade');
      $table->timestamp('tanggal_mulai');
      $table->timestamp('tanggal_berakhir')->nullable();
      $table->enum('status', ['aktif', 'kadaluarsa'])->default('aktif');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('booster_transaksis');
  }
};
