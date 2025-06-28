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
    Schema::create('transaksi_keanggotaans', function (Blueprint $table) {
      $table->id();

      $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
      $table->foreignId('id_keanggotaan')->nullable()->constrained('keanggotaans')->nullOnDelete();

      $table->string('kode_transaksi')->unique(); // e.g. TRX20250628001
      $table->integer('jumlah'); // total yang dibayar (setelah diskon, dll)
      $table->string('status')->default('pending'); // pending, sukses, gagal, expired
      $table->string('metode_pembayaran')->nullable(); // QRIS, VA BCA, Gopay, dll

      $table->timestamp('dibayar_pada')->nullable();
      $table->timestamp('expired_pada')->nullable();
      $table->text('catatan')->nullable(); // catatan tambahan jika ada

      // Audit
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
    Schema::dropIfExists('transaksi_keanggotaans');
  }
};
