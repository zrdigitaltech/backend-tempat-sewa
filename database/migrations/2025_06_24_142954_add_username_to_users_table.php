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
    Schema::table('users', function (Blueprint $table) {
      // Profil tambahan
      $table->string('username')->unique()->after('email');
      $table->string('avatar')->nullable()->after('username');
      $table->text('bio')->nullable()->after('avatar');
      $table->string('no_whatsapp')->unique()->nullable()->after('bio');
      $table->json('socials')->nullable()->after('no_whatsapp');

      // Auditing
      $table
        ->foreignId('created_by')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete()
        ->after('socials');
      $table
        ->foreignId('updated_by')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete()
        ->after('created_by');

      // $table->json('statistik')->nullable(); // rentang harga, iklan aktif, dst
      // $table->json('area_spesialis')->nullable(); // array of strings
      // $table->json('properti_spesialis')->nullable(); // array of strings
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropColumn('username');
    });
  }
};
