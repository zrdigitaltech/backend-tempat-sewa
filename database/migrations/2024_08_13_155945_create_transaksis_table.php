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
      $table->unsignedBigInteger('id_penyewa'); // Foreign key for tenant
      $table->unsignedBigInteger('id_kontrakan'); // Foreign key for kontrakan (property)
      $table->date('tgl_mulai'); // Start date of the rental
      $table->date('tgl_berakhir'); // End date of the rental
      $table->string('tipe_pembayaran'); // Payment type
      $table->decimal('bayar_dp', 15, 2); // Down payment amount
      $table->text('catatan')->nullable(); // Additional notes (can be null)
      $table->enum('status', ['active', 'inactive', 'completed', 'canceled']); // Status of the rental
      $table->timestamps(); // For created_at and updated_at

      // Add foreign key constraints
      // $table->foreign('id_penyewa')->references('id')->on('tenants')->onDelete('cascade');
      // $table->foreign('id_kontrakan')->references('id')->on('kontrakan')->onDelete('cascade');
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
