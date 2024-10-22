# Dockerfile
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Copy local.ini if needed
COPY ./docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Set working directory
WORKDIR /var/www/html

# Set direktori kerja
WORKDIR /var/www/html

# Salin file aplikasi
COPY . .

# Instal Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instal dependensi PHP
RUN composer install

# Ekspose port 9000 dan jalankan PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]
