<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        
        // Get supplier statistics
        $profileViews = rand(500, 2000); // Mock data for now
        $activeRfqs = \App\Models\BuyerRequest::where('status', 'open')->count();
        $responseRate = rand(80, 95); // Mock data for now
        $completedOrders = $user->ordersAsSupplier()->where('status', 'completed')->count();
        
        // Get recent RFQ opportunities
        $recentRfqs = \App\Models\BuyerRequest::where('status', 'open')
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'title' => $request->title,
                    'summary' => $request->summary,
                    'budget_min' => $request->budget_min,
                    'budget_max' => $request->budget_max,
                    'currency' => $request->currency,
                    'preferred_location' => $request->preferred_location,
                    'lead_valid_until' => $request->lead_valid_until ? $request->lead_valid_until->format('M d, Y') : null,
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('supplier/dashboard', [
            'stats' => [
                'profileViews' => $profileViews,
                'activeRfqs' => $activeRfqs,
                'responseRate' => $responseRate,
                'completedOrders' => $completedOrders,
            ],
            'recentRfqs' => $recentRfqs,
        ]);
    }
}
