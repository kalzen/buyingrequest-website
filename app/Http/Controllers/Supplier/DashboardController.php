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
        
        // Get supplier statistics with real data
        $profileViews = $user->getProfileViewsCount('30 days'); // Real data from profile_views table
        $activeRfqs = \App\Models\BuyerRequest::where('status', 'open')->count();
        
        // Calculate real response rate
        $totalRfqs = \App\Models\BuyerRequest::count();
        $myResponses = \App\Models\SupplierResponse::where('supplier_id', $user->id)->count();
        $responseRate = $totalRfqs > 0 ? round(($myResponses / $totalRfqs) * 100) : 0;
        
        $completedOrders = \App\Models\Order::where('supplier_id', $user->id)
            ->where('status', 'completed')
            ->count();
        
        // Get recent RFQ opportunities (not yet responded to)
        $respondedRequestIds = \App\Models\SupplierResponse::where('supplier_id', $user->id)
            ->pluck('buyer_request_id');
            
        $recentRfqs = \App\Models\BuyerRequest::where('status', 'open')
            ->whereNotIn('id', $respondedRequestIds)
            ->latest()
            ->take(5)
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

        // Get current subscription
        $currentSubscription = $user->activeSubscription();

        return Inertia::render('supplier/dashboard', [
            'stats' => [
                'profileViews' => $profileViews,
                'activeRfqs' => $activeRfqs,
                'responseRate' => (int) $responseRate,
                'completedOrders' => $completedOrders,
            ],
            'recentRfqs' => $recentRfqs,
            'currentPlan' => $currentSubscription ? [
                'plan' => $currentSubscription->plan,
                'status' => $currentSubscription->status,
            ] : ['plan' => 'free', 'status' => 'active'],
        ]);
    }
}
