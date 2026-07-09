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
    Schema::table('transaksis', function (Blueprint $table) {
      $table->decimal('fee', 12, 2)->nullable()->after('jumlah_pemasukan');
      $table->string('id_settlement')->nullable()->after('fee');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('transaksis', function (Blueprint $table) {
      $table->dropColumn(['fee', 'id_settlement']);
    });
  }
};
