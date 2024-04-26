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
    Schema::create('pengeluarans', function (Blueprint $table) {
      $table->id();
      $table->date('tanggal');
      $table->string('id_kontrakan');
      $table->string('id_kategori');
      $table->text('keterangan')->nullable();
      $table->integer('jumlah_pengeluaran');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('pengeluarans');
  }
};
