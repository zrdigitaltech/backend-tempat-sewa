build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
compose-update:
  docker exec laravel_app bash -c "composer-update"
data:
	docker exec laravel_app bash -c "php artisan migrate"