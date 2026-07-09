<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipe_propertis', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->unique();
            $table->string('slug')->unique();
            $table->enum('kategori', ['hunian', 'usaha', 'lainnya']);
            $table->timestamps();
        });

        // Tambahkan foreign key jika tabel propertis sudah ada
        if (Schema::hasTable('propertis') && Schema::hasColumn('propertis', 'type_id')) {
            Schema::table('propertis', function (Blueprint $table) {
                try {
                    $table->foreign('type_id')
                        ->references('id')
                        ->on('tipe_propertis')
                        ->nullOnDelete();
                } catch (\Throwable $e) {
                    // Abaikan jika foreign key sudah ada
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('propertis')) {
            Schema::table('propertis', function (Blueprint $table) {
                try {
                    $table->dropForeign(['type_id']);
                } catch (\Throwable $e) {
                    // Abaikan jika foreign key tidak ada
                }
            });
        }

        Schema::dropIfExists('tipe_propertis');
    }
};