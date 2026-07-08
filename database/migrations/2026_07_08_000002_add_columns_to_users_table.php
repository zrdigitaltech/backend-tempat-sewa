<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (Schema::hasTable('users')) {
      Schema::table('users', function (Blueprint $table) {
        if (!Schema::hasColumn('users', 'username')) $table->string('username')->unique()->nullable()->after('email');
        if (!Schema::hasColumn('users', 'avatar')) $table->string('avatar')->nullable()->after('username');
        if (!Schema::hasColumn('users', 'phone')) $table->string('phone')->nullable()->after('avatar');
        if (!Schema::hasColumn('users', 'bio')) $table->text('bio')->nullable()->after('phone');
        if (!Schema::hasColumn('users', 'no_whatsapp')) $table->string('no_whatsapp')->nullable()->after('bio');
        if (!Schema::hasColumn('users', 'socials')) $table->json('socials')->nullable()->after('no_whatsapp');
        if (!Schema::hasColumn('users', 'is_verified')) $table->boolean('is_verified')->default(false)->after('socials');
        if (!Schema::hasColumn('users', 'meta')) $table->json('meta')->nullable()->after('is_verified');
        if (!Schema::hasColumn('users', 'created_by')) $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('meta');
        if (!Schema::hasColumn('users', 'updated_by')) $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
      });
    }
  }

  public function down(): void
  {
    if (Schema::hasTable('users')) {
      Schema::table('users', function (Blueprint $table) {
        foreach (['updated_by','created_by','meta','is_verified','socials','no_whatsapp','bio','phone','avatar','username'] as $c) {
          if (Schema::hasColumn('users', $c)) {
            try { $table->dropColumn($c); } catch (\Exception $e) {}
          }
        }
      });
    }
  }
};
