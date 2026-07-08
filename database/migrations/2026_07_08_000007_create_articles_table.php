<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('articles')) {
      Schema::create('articles', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique()->nullable();
        $table->string('image')->nullable();
        $table->date('published_at')->nullable();
        $table->foreignId('author_id')->nullable()->constrained('authors')->nullOnDelete();
        $table->string('category')->nullable();
        $table->longText('content')->nullable();
        $table->json('meta')->nullable();
        $table->timestamps();
      });
    }
  }

  public function down(): void
  {
    Schema::dropIfExists('articles');
  }
};
