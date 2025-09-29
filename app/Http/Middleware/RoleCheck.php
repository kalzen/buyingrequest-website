<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        $userRole = $user->role ?? 'buyer'; // Default role is buyer

        if (!in_array($userRole, $roles)) {
            // Redirect based on user role
            switch ($userRole) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'supplier':
                    return redirect()->route('supplier.dashboard');
                case 'buyer':
                default:
                    return redirect()->route('buyer.dashboard');
            }
        }

        return $next($request);
    }
}
