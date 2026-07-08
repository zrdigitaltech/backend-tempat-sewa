<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    if (!Schema::hasTable('propertis')) return;
    $properties = DB::table('propertis')->get();
    foreach ($properties as $p) {
      // images -> property_images
      if (!empty($p->image)) {
        $images = null;
        if (is_string($p->image)) $images = json_decode($p->image, true) ?: null;
        elseif (is_array($p->image)) $images = $p->image;
        if (is_array($images)) {
          $order = 0;
          foreach ($images as $img) {
            if (empty($img)) continue;
            DB::table('property_images')->insert([
              'property_id' => $p->id,
              'url' => $img,
              'sort_order' => $order++,
              'created_at' => now(),
              'updated_at' => now(),
            ]);
          }
        }
      }

      // harga_sewa -> price/duration
      if (!empty($p->harga_sewa)) {
        $price = null; $duration = null;
        if (is_string($p->harga_sewa)) {
          $decoded = json_decode($p->harga_sewa, true);
          if ($decoded) {
            if (isset($decoded['harga'])) $price = $decoded['harga'];
            elseif (isset($decoded['price'])) $price = $decoded['price'];
            elseif (isset($decoded[0])) $price = $decoded[0];
            if (isset($decoded['durasi'])) $duration = $decoded['durasi'];
          } else {
            if (preg_match('/(\d[\d.,]*)/', $p->harga_sewa, $m)) {
              $num = preg_replace('/[^0-9]/', '', $m[1]);
              $price = is_numeric($num) ? (int)$num : null;
            }
            if (preg_match('/(bulan|tahun|hari)/i', $p->harga_sewa, $m2)) $duration = strtolower($m2[1]);
          }
        } elseif (is_array($p->harga_sewa)) {
          $first = reset($p->harga_sewa);
          if (is_numeric($first)) $price = $first;
        }
        $update = [];
        if (!is_null($price)) $update['price'] = $price;
        if (!is_null($duration)) $update['duration'] = $duration;
        if (!empty($update)) DB::table('propertis')->where('id', $p->id)->update($update);
      }
    }
  }

  public function down(): void
  {
    // not reversible safely
  }
};
