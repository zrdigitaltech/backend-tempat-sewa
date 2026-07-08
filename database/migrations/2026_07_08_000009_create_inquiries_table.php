<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('inquiries')) {
      Schema::create('inquiries', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->nullable()->constrained('propertis')->nullOnDelete();
        $table->string('name')->nullable();
        $table->string('phone')->nullable();
        $table->text('message')->nullable();
        $table->timestamps();
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('inquiries');
  }
};
