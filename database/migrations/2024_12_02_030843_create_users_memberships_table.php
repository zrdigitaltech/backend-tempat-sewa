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
    Schema::create('users_memberships', function (Blueprint $table) {
      $table->id();
      $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
      $table->foreignId('id_membership')->constrained('memberships')->onDelete('cascade');
      $table->timestamp('start_date');
      $table->timestamp('end_date')->nullable();
      $table->boolean('is_active')->default(true);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users_memberships');
  }
};
