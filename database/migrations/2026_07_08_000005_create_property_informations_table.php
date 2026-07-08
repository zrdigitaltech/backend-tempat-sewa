<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('property_informations')) {
      Schema::create('property_informations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->constrained('propertis')->onDelete('cascade');
        $table->string('info_type');
        $table->string('name')->nullable();
        $table->json('data')->nullable();
        $table->timestamps();
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('property_informations');
  }
};
