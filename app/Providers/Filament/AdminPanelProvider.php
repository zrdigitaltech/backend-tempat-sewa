<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Navigation\MenuItem;
use Filament\Navigation\NavigationItem;

use App\Filament\Widgets\BannerWidget;
use App\Filament\Widgets\AreaLayananWidget;
use App\Filament\Widgets\LayananWidget;
use App\Filament\Widgets\GaleriWidget;
use App\Filament\Widgets\TestimoniWidget;
use App\Filament\Widgets\CustomerWidget;

use Illuminate\Support\Facades\Auth;

class AdminPanelProvider extends PanelProvider
{
  protected static ?int $navigationSort = 3;
  protected static ?string $navigationGroup = 'NumberLayanan';

  public function panel(Panel $panel): Panel
  {
    return $panel
      ->default()
      ->id('admin')
      ->path('admin')
      ->spa()
      ->unsavedChangesAlerts()
      ->plugins([
        \BezhanSalleh\FilamentShield\FilamentShieldPlugin::make()
      ])
      ->login()
      // ->passwordReset()
      // ->profile()
      ->colors([
        'primary' => Color::Amber,
      ])
      // ->sidebarCollapsibleOnDesktop()
      ->globalSearchKeyBindings(['command+k', 'ctrl+k'])
      ->navigationItems([
        NavigationItem::make('Documentation')
          ->url('/admin', shouldOpenInNewTab: true)
          ->icon('heroicon-o-document')
          ->group('External')
          ->sort(8),
        NavigationItem::make('Help')
          ->url('https://zrdevelopers.github.io/', shouldOpenInNewTab: true)
          ->icon('heroicon-o-question-mark-circle')
          ->group('External')
          ->sort(8),
      ])
      ->userMenuItems([
        // MenuItem::make()->label('Settings')->url('')->icon('heroicon-o-cog-6-tooth'),
        'logout' => MenuItem::make()->label('Log Out'),
      ])
      ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
      ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
      ->pages([Pages\Dashboard::class])
      ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
      // ->widgets([]) // $this->getWidgetsForPermissions()
      ->middleware(
        [
          EncryptCookies::class,
          AddQueuedCookiesToResponse::class,
          StartSession::class,
          AuthenticateSession::class,
          ShareErrorsFromSession::class,
          VerifyCsrfToken::class,
          SubstituteBindings::class,
          DisableBladeIconComponents::class,
          DispatchServingFilamentEvent::class,
        ],
        isPersistent: true
      )
      ->authMiddleware([Authenticate::class], isPersistent: true);
  }

  protected function getWidgetsForPermissions(): array
  {
    // dd(Auth::user());
    $widgets = [
      BannerWidget::class,
      AreaLayananWidget::class,
      LayananWidget::class,
      GaleriWidget::class,
      TestimoniWidget::class,
    ];

    // Check if the authenticated user has the 'view customer widget' permission
    if (Auth::check() && Auth::user()->hasRole('operator')) {
      $widgets[] = CustomerWidget::class;
    }

    return $widgets;
  }
}
