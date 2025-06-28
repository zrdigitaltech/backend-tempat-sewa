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
    Schema::create('keanggotaans', function (Blueprint $table) {
      $table->id();
      $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
      $table
        ->foreignId('id_paketkeanggotaan')
        ->constrained('paket_keanggotaans')
        ->onDelete('cascade');
      $table->timestamp('tanggal_mulai');
      $table->timestamp('tanggal_berakhir')->nullable();
      $table->boolean('aktif')->default(true);

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
    Schema::dropIfExists('keanggotaans');
  }
};
