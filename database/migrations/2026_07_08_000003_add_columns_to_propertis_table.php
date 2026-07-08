<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (Schema::hasTable('propertis')) {
      Schema::table('propertis', function (Blueprint $table) {
        if (!Schema::hasColumn('propertis', 'user_id')) $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
        if (!Schema::hasColumn('propertis', 'owner_id')) $table->foreignId('owner_id')->nullable()->constrained('owners')->nullOnDelete();
        if (!Schema::hasColumn('propertis', 'type_id')) $table->foreignId('type_id')->nullable()->constrained('tipe_propertis')->nullOnDelete();
        if (!Schema::hasColumn('propertis', 'image')) $table->json('image')->nullable();
        if (!Schema::hasColumn('propertis', 'harga_sewa')) $table->json('harga_sewa')->nullable();
        if (!Schema::hasColumn('propertis', 'price')) $table->bigInteger('price')->nullable();
        if (!Schema::hasColumn('propertis', 'duration')) $table->string('duration')->default('bulan');
        if (!Schema::hasColumn('propertis', 'views')) $table->integer('views')->default(0);
        if (!Schema::hasColumn('propertis', 'is_featured')) $table->boolean('is_featured')->default(false);
        if (!Schema::hasColumn('propertis', 'extra')) $table->json('extra')->nullable();
      });
    }
  }

  public function down(): void
  {
    if (Schema::hasTable('propertis')) {
      Schema::table('propertis', function (Blueprint $table) {
        foreach (['extra','is_featured','views','duration','price','harga_sewa','image','type_id','owner_id','user_id'] as $c) {
          if (Schema::hasColumn('propertis', $c)) {
            try { $table->dropColumn($c); } catch (\Exception $e) {}
          }
        }
      });
    }
  }
};
