![result]()

<b>Nama Pemilik Kontrakan</b><br>

<hr>
<p>
    Website ini mempunyai fitur : 
</p>
<ul>
    <li>Lorem Ipsum</li>
</ul>

<p>Website ini dibuat menggunakan Framework Laravel v10.44.0 dengan tambahan package-package lain, seperti :<br><br>
1) VITE v5.1.3,<br>
2) Bootstrap v5
</p>

Cara menjalankan Website :

- Simpan Project di /htdocs (kalau pake xampp)
- jalankan "composer install" di dalam terminal/cmd
- jalankan "npm install" di dalam terminal/cmd
- buka folder project, copykan .env.example, menjadi .env
- isi DB_DATABASE, DB_USERNAME, DB_PASSWORD, sesuaikan dengan settingan database kamu
- di dalam directory project buka terminal, ketikan "php artisan key:generate"
- di dalam directory project buka terminal, ketikan "php artisan migrate"
- di dalam directory project buka terminal, ketikan "php artisan db:seed"
- php artisan make:filament-resource Banner
- di dalam directory project buka terminal, ketikan "php artisan serve"
- buka browser, ketikan url "localhost:8000"

**Note**

- php artisan migrate
- php artisan db:seed --class=PaketKeanggotaansTableSeeder
- php artisan db:seed --class=UsersTableSeeder
- php artisan db:seed --class=RolePermissionSeeder
- php artisan make:model Testimoni -m
- php artisan make:filament-resource Layanan
- php artisan l5-swagger:generate
- php artisan make:filament-widget MyCustomWidget
- php artisan make:migration create_invoices_table
- php artisan make:filament-page RiwayatTransaksiPage --resource=PenyewaResource
- php artisan shield:generate
- php artisan shield:generate --panel=web

docker exec -it laravel_app bash
apt-get update && apt-get install -y libpdo-mysql
docker-php-ext-install pdo_mysql

./vendor/bin/sail up
./vendor/bin/sail artisan
