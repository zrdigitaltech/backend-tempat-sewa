<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('owners')) {
      Schema::create('owners', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->string('avatar')->nullable();
        $table->text('bio')->nullable();
        $table->string('whatsapp')->nullable();
        $table->json('socials')->nullable();
        $table->boolean('is_verified')->default(false);
        $table->json('stats')->nullable();
        $table->json('area_specialist')->nullable();
        $table->json('property_types')->nullable();
        $table->timestamps();
      });
    }

    // If `propertis.owner_id` exists, add foreign key constraint now that `owners` table exists
    if (Schema::hasTable('propertis') && Schema::hasColumn('propertis', 'owner_id')) {
      Schema::table('propertis', function (Blueprint $table) {
        // avoid duplicate foreign keys
        try {
          $table->foreign('owner_id')->references('id')->on('owners')->nullOnDelete();
        } catch (\Exception $e) {
          // ignore if constraint exists or cannot be created
        }
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('owners');
  }
};
