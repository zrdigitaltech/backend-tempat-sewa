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
    Schema::create('floating_whatsapps', function (Blueprint $table) {
      $table->id();
      $table->string('avatar');
      $table->string('phone_number')->nullable();
      $table->string('account_name')->nullable();
      $table->string('chat_message')->nullable();
      $table->string('status_message')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('floating_whatsapps');
  }
};
