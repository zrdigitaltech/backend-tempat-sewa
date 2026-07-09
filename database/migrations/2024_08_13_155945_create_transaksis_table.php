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
      $table->unsignedBigInteger('id_penyewa')->nullable();
      $table->unsignedBigInteger('id_properti')->nullable();
      $table->string('id_kategori')->nullable();
      $table->string('tipe_pembayaran')->nullable();
      $table->date('tanggal')->nullable();
      $table->date('tgl_pembayaran_berikutnya')->nullable();
      $table->integer('bayar_dp')->nullable();
      $table->text('catatan')->nullable();
      $table->integer('jumlah_pemasukan')->nullable();
      $table->integer('jumlah_pengeluaran')->nullable();
      $table->enum('jenis_transaksi', ['pemasukan', 'pengeluaran']);
      $table->decimal('fee', 12, 2)->nullable();
      $table->string('id_settlement')->nullable();
      $table->string('external_id')->nullable();
      $table
        ->enum('status_pembayaran', ['tertunda', 'dibayar', 'gagal', 'dikembalikan'])
        ->nullable();
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
