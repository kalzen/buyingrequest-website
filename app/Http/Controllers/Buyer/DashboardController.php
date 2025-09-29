<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        
        // Get buyer statistics
        $activeRequests = $user->buyerRequests()->where('status', 'open')->count();
        $supplierContacts = $user->supplierContacts()->count();
        $completedOrders = $user->ordersAsBuyer()->where('status', 'completed')->count();
        
        // Get recent activity
        $recentRequests = $user->buyerRequests()
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'title' => $request->title,
                    'status' => $request->status,
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('buyer/dashboard', [
            'stats' => [
                'activeRequests' => $activeRequests,
                'supplierContacts' => $supplierContacts,
                'completedOrders' => $completedOrders,
            ],
            'recentRequests' => $recentRequests,
        ]);
    }
}
