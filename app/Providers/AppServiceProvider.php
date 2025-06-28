<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Observers\UserObserver;
use App\Models\PaketKeanggotaan;
use App\Observers\PaketKeanggotaanObserver;
use App\Models\Keanggotaan;
use App\Observers\KeanggotaanObserver;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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
    // Observer & Script
    User::observe(UserObserver::class);
    PaketKeanggotaan::observe(PaketKeanggotaanObserver::class);
    Keanggotaan::observe(KeanggotaanObserver::class);

    FilamentView::registerRenderHook(
      PanelsRenderHook::SCRIPTS_AFTER,
      fn(): string => new HtmlString(
        '<script>document.addEventListener("scroll-to-top", () => window.scrollTo(0, 0))</script>'
      )
    );

    // Role Policy (untuk Shield)
    Gate::policy(\Spatie\Permission\Models\Role::class, \App\Policies\RolePolicy::class);

    // ✅ Tambahkan ini jika ingin auto-assign semua permission ke super_admin saat permission berubah
    // if (Role::where('name', 'super_admin')->exists()) {
    //   $superAdmin = Role::where('name', 'super_admin')->first();
    //   $allPermissions = Permission::all();

    //   // Cek apakah sudah lengkap
    //   $missing = $allPermissions->diff($superAdmin->permissions);
    //   if ($missing->isNotEmpty()) {
    //     $superAdmin->syncPermissions($allPermissions);
    //   }
    // }

    // if ($this->app->environment('local')) {
    //   URL::forceScheme('https');
    // }
  }
}
