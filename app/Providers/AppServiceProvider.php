<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Observers\UserObserver;

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
    User::observe(UserObserver::class);
    FilamentView::registerRenderHook(
      PanelsRenderHook::SCRIPTS_AFTER,
      fn(): string => new HtmlString('
    <script>document.addEventListener("scroll-to-top", () => window.scrollTo(0, 0))</script>
        ')
    );
    Gate::policy(\Spatie\Permission\Models\Role::class, \App\Policies\RolePolicy::class);

    // if ($this->app->environment('local')) {
    //   URL::forceScheme('https');
    // }
  }
}
