<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\Facades\Filament;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // $this->app->bind('path.public', function () {
        //     return base_path() . '/../public_html';
        // });
        Filament::serving(function () {

          // First we register a custom navigation group
          Filament::registerNavigationGroups([
            'Banner',
          ]);

          // Then we register the links that will go into that navigation group
          Filament::serving(function () {
            Filament::registerNavigationGroups([
                NavigationGroup::make()
                     ->label('Banner')
                     ->icon('heroicon-s-shopping-cart')
            ]);
          });
        });
    }
}
