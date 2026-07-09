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
    Schema::create('propertis', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->unsignedBigInteger('owner_id')->nullable();
      $table->unsignedBigInteger('type_id')->nullable();
      $table->json('image')->nullable();
      $table->string('nama')->unique();
      $table->string('slug', 255)->unique();
      $table->text('deskripsi');
      $table->text('keterangan')->nullable();
      $table->json('harga_sewa')->nullable();
      $table->bigInteger('price')->nullable();
      $table->string('duration')->default('bulan');
      $table->integer('views')->default(0);
      $table->boolean('is_featured')->default(false);
      $table->json('extra')->nullable();
      $table->enum('status', ['tersedia', 'tidak tersedia']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('propertis');
  }
};
