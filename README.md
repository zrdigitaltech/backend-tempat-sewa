# Backend Tempat Sewa

Website ini adalah backend untuk aplikasi Tempat Sewa (admin panel dan API).

---

Ringkasan fitur

- Manajemen properti, penyewa, transaksi, paket keanggotaan, dan tagihan
- Notifikasi, observability, dan integrasi Filament untuk panel admin

Teknologi utama

- PHP 8+ dan Laravel 10.44.0
- Vite v5, Bootstrap 5
- Filament, l5-swagger, Sanctum, Filament Shield

Prasyarat

- PHP >= 8.1, Composer
- Node.js & npm
- MySQL / MariaDB
- (Opsional) Docker & Docker Compose or Laravel Sail

Instalasi & Jalankan (lokal)

1. Salin project ke folder kerja (atau ke `htdocs` jika menggunakan XAMPP)
2. Jalankan dependencies PHP:

```bash
composer install
```

3. Install dependencies JS:

```bash
npm install
```

4. Salin file environment dan edit konfigurasi database:

```bash
cp .env.example .env
# edit DB_DATABASE, DB_USERNAME, DB_PASSWORD di .env
```

5. Generate application key:

```bash
php artisan key:generate
```

6. Jalankan migrasi dan seeder (sesuaikan dengan kebutuhan):

```bash
php artisan migrate
php artisan db:seed
# atau jalankan seeder tertentu, mis.:
php artisan db:seed --class=PaketKeanggotaansTableSeeder
php artisan db:seed --class=UsersTableSeeder
php artisan db:seed --class=RolePermissionSeeder
```

7. Jalankan Vite untuk development frontend (opsional):

```bash
npm run dev
```

8. Jalankan aplikasi Laravel:

```bash
php artisan serve
# atau gunakan Sail (jika tersedia):
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
```

Catatan Docker / PHP

Jika menggunakan image Docker berbasis PHP, pastikan extension `pdo_mysql` terpasang:

```bash
docker exec -it laravel_app bash
apt-get update && apt-get install -y libpdo-mysql
docker-php-ext-install pdo_mysql
```

Perintah Artisan dan catatan lainnya

- Membuat resource Filament: `php artisan make:filament-resource Banner`
- Generate Swagger: `php artisan l5-swagger:generate`
- Filament widget/page generator: `php artisan make:filament-widget MyCustomWidget`
- Shield (permission panel): `php artisan shield:install` dan `php artisan shield:generate`
- Contoh membuat migration/model: `php artisan make:model Testimoni -m`
- Mengecek keanggotaan kadaluarsa: `php artisan keanggotaan:expire`

Debug & testing

- Gunakan `php artisan tinker`, `php artisan route:list`, dan `php artisan config:cache` saat diperlukan