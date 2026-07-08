<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
  public function up(): void
  {
    // Owners
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

    // Users - add columns if missing
    Schema::table('users', function (Blueprint $table) {
      if (!Schema::hasColumn('users', 'username')) {
        $table->string('username')->unique()->nullable()->after('email');
      }
      if (!Schema::hasColumn('users', 'avatar')) {
        $table->string('avatar')->nullable()->after('username');
      }
      if (!Schema::hasColumn('users', 'bio')) {
        $table->text('bio')->nullable()->after('avatar');
      }
      if (!Schema::hasColumn('users', 'no_whatsapp')) {
        $table->string('no_whatsapp')->unique()->nullable()->after('bio');
      }
      if (!Schema::hasColumn('users', 'socials')) {
        $table->json('socials')->nullable()->after('no_whatsapp');
      }
      if (!Schema::hasColumn('users', 'role')) {
        $table->string('role')->default('user')->nullable()->after('password');
      }
      if (!Schema::hasColumn('users', 'phone')) {
        $table->string('phone')->nullable()->after('avatar');
      }
      if (!Schema::hasColumn('users', 'is_verified')) {
        $table->boolean('is_verified')->default(false)->after('phone');
      }
      if (!Schema::hasColumn('users', 'meta')) {
        $table->json('meta')->nullable()->after('is_verified');
      }
      if (!Schema::hasColumn('users', 'created_by')) {
        $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('socials');
      }
      if (!Schema::hasColumn('users', 'updated_by')) {
        $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
      }
    });

    // propertis (ensure columns)
    Schema::table('propertis', function (Blueprint $table) {
      if (!Schema::hasColumn('propertis', 'owner_id')) {
        $table->foreignId('owner_id')->nullable()->after('user_id')->constrained('owners')->nullOnDelete();
      }
      if (!Schema::hasColumn('propertis', 'type_id')) {
        // assume tipe_propertis exists
        $table->foreignId('type_id')->nullable()->after('owner_id')->constrained('tipe_propertis')->nullOnDelete();
      }
      if (!Schema::hasColumn('propertis', 'address')) $table->text('address')->nullable()->after('slug');
      if (!Schema::hasColumn('propertis', 'area')) $table->string('area')->nullable()->after('address');
      if (!Schema::hasColumn('propertis', 'city')) $table->string('city')->nullable()->after('area');
      if (!Schema::hasColumn('propertis', 'whatsapp')) $table->string('whatsapp')->nullable()->after('city');
      if (!Schema::hasColumn('propertis', 'member_level')) $table->string('member_level')->nullable()->after('whatsapp');
      if (!Schema::hasColumn('propertis', 'duration')) $table->string('duration')->nullable()->after('harga_sewa');
      if (!Schema::hasColumn('propertis', 'duration_min')) $table->integer('duration_min')->nullable()->after('duration');
      if (!Schema::hasColumn('propertis', 'upload_date')) $table->dateTime('upload_date')->nullable()->after('duration_min');
      if (!Schema::hasColumn('propertis', 'electricity_capacity')) $table->integer('electricity_capacity')->nullable()->after('upload_date');
      if (!Schema::hasColumn('propertis', 'electricity_cost')) $table->string('electricity_cost')->nullable()->after('electricity_capacity');
      if (!Schema::hasColumn('propertis', 'views')) $table->integer('views')->default(0)->after('electricity_cost');
      if (!Schema::hasColumn('propertis', 'is_featured')) $table->boolean('is_featured')->default(false)->after('views');
      if (!Schema::hasColumn('propertis', 'extra')) $table->json('extra')->nullable()->after('is_featured');
      if (!Schema::hasColumn('propertis', 'price')) $table->bigInteger('price')->nullable()->after('slug');
    });

    // property_images
    if (!Schema::hasTable('property_images')) {
      Schema::create('property_images', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->constrained('propertis')->onDelete('cascade');
        $table->string('url');
        $table->integer('sort_order')->default(0);
        $table->timestamps();
      });
    }

    // property_informations
    if (!Schema::hasTable('property_informations')) {
      Schema::create('property_informations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->constrained('propertis')->onDelete('cascade');
        $table->string('info_type');
        $table->string('name')->nullable();
        $table->json('data')->nullable();
        $table->timestamps();
      });
    }

    // authors
    if (!Schema::hasTable('authors')) {
      Schema::create('authors', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->string('avatar')->nullable();
        $table->text('bio')->nullable();
        $table->timestamps();
      });
    }

    // articles
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

    // reviews
    if (!Schema::hasTable('reviews')) {
      Schema::create('reviews', function (Blueprint $table) {
        $table->id();
        $table->foreignId('property_id')->nullable()->constrained('propertis')->nullOnDelete();
        $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
        $table->tinyInteger('rating')->default(5);
        $table->text('comment')->nullable();
        $table->timestamps();
      });
    }

    // inquiries
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

    // reports
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

    // suggestions
    if (!Schema::hasTable('suggestions')) {
      Schema::create('suggestions', function (Blueprint $table) {
        $table->id();
        $table->string('name')->nullable();
        $table->string('email')->nullable();
        $table->text('message')->nullable();
        $table->timestamps();
      });
    }

    // tipe lookup tables
    if (!Schema::hasTable('tipe_kost')) {
      Schema::create('tipe_kost', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }
    if (!Schema::hasTable('tipe_kamar')) {
      Schema::create('tipe_kamar', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }
    if (!Schema::hasTable('tipe_sewa')) {
      Schema::create('tipe_sewa', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('slug')->unique()->nullable();
        $table->timestamps();
      });
    }

    // konsultasi
    if (!Schema::hasTable('konsultasi')) {
      Schema::create('konsultasi', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
        $table->string('name')->nullable();
        $table->string('email')->nullable();
        $table->string('topic')->nullable();
        $table->text('message')->nullable();
        $table->string('status')->default('new');
        $table->timestamps();
      });
    }

    // Data migration: move images, extract price/duration, create owners
    if (Schema::hasTable('propertis')) {
      $properties = DB::table('propertis')->get();
      foreach ($properties as $p) {
        // owners
        $ownerId = null;
        if (!empty($p->user_id)) {
          $owner = DB::table('owners')->where('user_id', $p->user_id)->first();
          if (!$owner) {
            $user = DB::table('users')->where('id', $p->user_id)->first();
            $name = $user->name ?? ('Owner ' . $p->user_id);
            $slug = preg_replace('/[^a-z0-9]+/i', '-', strtolower($name));
            $ownerId = DB::table('owners')->insertGetId([
              'user_id' => $p->user_id,
              'name' => $name,
              'slug' => $slug,
              'created_at' => now(),
              'updated_at' => now(),
            ]);
          } else {
            $ownerId = $owner->id;
          }
          if ($ownerId) {
            DB::table('propertis')->where('id', $p->id)->update(['owner_id' => $ownerId]);
          }
        }

        // images
        if (!empty($p->image)) {
          $images = null;
          if (is_string($p->image)) {
            $decoded = json_decode($p->image, true);
            $images = $decoded ?: null;
          } elseif (is_array($p->image)) {
            $images = $p->image;
          }
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
          $price = null;
          $duration = null;
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
                $price = is_numeric($num) ? (int) $num : null;
              }
              if (preg_match('/(bulan|tahun|hari)/i', $p->harga_sewa, $m2)) {
                $duration = strtolower($m2[1]);
              }
            }
          } elseif (is_array($p->harga_sewa)) {
            $arr = $p->harga_sewa;
            $first = reset($arr);
            if (is_numeric($first)) $price = $first;
          }
          $update = [];
          if (!is_null($price)) $update['price'] = $price;
          if (!is_null($duration)) $update['duration'] = $duration;
          if (!empty($update)) {
            DB::table('propertis')->where('id', $p->id)->update($update);
          }
        }
      }
    }

  }

  public function down(): void
  {
    // drop created tables (safe only if app expects)
    Schema::dropIfExists('konsultasi');
    Schema::dropIfExists('tipe_sewa');
    Schema::dropIfExists('tipe_kamar');
    Schema::dropIfExists('tipe_kost');
    Schema::dropIfExists('suggestions');
    Schema::dropIfExists('reports');
    Schema::dropIfExists('inquiries');
    Schema::dropIfExists('reviews');
    Schema::dropIfExists('articles');
    Schema::dropIfExists('authors');
    Schema::dropIfExists('property_informations');
    Schema::dropIfExists('property_images');
    // remove added columns from users/propertis where possible
    Schema::table('propertis', function (Blueprint $table) {
      if (Schema::hasColumn('propertis', 'price')) $table->dropColumn('price');
      if (Schema::hasColumn('propertis', 'extra')) $table->dropColumn('extra');
      if (Schema::hasColumn('propertis', 'is_featured')) $table->dropColumn('is_featured');
      if (Schema::hasColumn('propertis', 'views')) $table->dropColumn('views');
      if (Schema::hasColumn('propertis', 'electricity_cost')) $table->dropColumn('electricity_cost');
      if (Schema::hasColumn('propertis', 'electricity_capacity')) $table->dropColumn('electricity_capacity');
      if (Schema::hasColumn('propertis', 'upload_date')) $table->dropColumn('upload_date');
      if (Schema::hasColumn('propertis', 'duration_min')) $table->dropColumn('duration_min');
      if (Schema::hasColumn('propertis', 'duration')) $table->dropColumn('duration');
      if (Schema::hasColumn('propertis', 'member_level')) $table->dropColumn('member_level');
      if (Schema::hasColumn('propertis', 'whatsapp')) $table->dropColumn('whatsapp');
      if (Schema::hasColumn('propertis', 'city')) $table->dropColumn('city');
      if (Schema::hasColumn('propertis', 'area')) $table->dropColumn('area');
      if (Schema::hasColumn('propertis', 'address')) $table->dropColumn('address');
      if (Schema::hasColumn('propertis', 'type_id')) {
        $table->dropForeign(['type_id']);
        $table->dropColumn('type_id');
      }
      if (Schema::hasColumn('propertis', 'owner_id')) {
        $table->dropForeign(['owner_id']);
        $table->dropColumn('owner_id');
      }
    });

    Schema::table('users', function (Blueprint $table) {
      if (Schema::hasColumn('users', 'updated_by')) $table->dropForeign(['updated_by']);
      if (Schema::hasColumn('users', 'created_by')) $table->dropForeign(['created_by']);
      if (Schema::hasColumn('users', 'meta')) $table->dropColumn('meta');
      if (Schema::hasColumn('users', 'is_verified')) $table->dropColumn('is_verified');
      if (Schema::hasColumn('users', 'phone')) $table->dropColumn('phone');
      if (Schema::hasColumn('users', 'role')) $table->dropColumn('role');
      if (Schema::hasColumn('users', 'socials')) $table->dropColumn('socials');
      if (Schema::hasColumn('users', 'no_whatsapp')) $table->dropColumn('no_whatsapp');
      if (Schema::hasColumn('users', 'bio')) $table->dropColumn('bio');
      if (Schema::hasColumn('users', 'avatar')) $table->dropColumn('avatar');
      if (Schema::hasColumn('users', 'username')) $table->dropColumn('username');
    });

    Schema::dropIfExists('owners');
  }
};
