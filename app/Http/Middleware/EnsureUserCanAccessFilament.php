<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserCanAccessFilament
{
    public function handle(Request $request, Closure $next): Response
    {
        // $user = auth()->user();

        // // Ganti sesuai aturan kamu
        // if (! $user || ! $user->hasRole('admin')) {
        //     abort(403);
        // }

        return $next($request);
    }
}
