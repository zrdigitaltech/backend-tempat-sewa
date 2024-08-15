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
    Schema::create('pengaduans', function (Blueprint $table) {
      $table->id();
      $table->string('nama');
      $table->string('no_telp');
      $table->string('id_kontrakan');
      $table->text('catatan');
      $table->enum('status', ['terbuka', 'sedang dalam proses', 'tertutup']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('pengaduans');
  }
};
