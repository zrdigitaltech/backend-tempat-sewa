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
        Schema::create('kontak_kamis', function (Blueprint $table) {
            $table->id();
            $table->string('alamat')->nullable();
            $table->string('jam_kerja')->nullable();
            $table->integer('no_telp')->nullable();
            $table->integer('no_wa')->nullable();
            $table->string('link_no_wa')->nullable();
            $table->string('email')->nullable();
            $table->text('embed_google_map')->nullable();
            $table->string( 'link_konfirmasi_wa')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontak_kamis');
    }
};
