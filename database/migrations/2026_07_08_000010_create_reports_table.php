<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('reports')) {
      Schema::create('reports', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->nullable()->constrained('propertis')->nullOnDelete();
        $table->string('reporter_name')->nullable();
        $table->string('reporter_contact')->nullable();
        $table->text('reason')->nullable();
        $table->timestamps();
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('reports');
  }
};
