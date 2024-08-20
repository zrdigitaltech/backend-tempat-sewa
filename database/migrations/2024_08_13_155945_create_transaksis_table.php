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
    Schema::create('transaksis', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('id_penyewa');
      $table->unsignedBigInteger('id_kontrakan');
      $table->string('tipe_pembayaran');
      $table->date('tgl_mulai');
      $table->date('tgl_pembayaran_berikutnya');
      $table->integer('bayar_dp');
      $table->text('catatan')->nullable();
      $table->enum('status_pembayaran', ['tertunda', 'dibayar', 'gagal', 'dikembalikan']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transaksis');
  }
};
