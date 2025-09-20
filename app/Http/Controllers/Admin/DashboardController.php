<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BuyerRequest;
use App\Models\Slide;
use App\Models\SupplierProfile;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $metrics = [
            'totalSuppliers' => SupplierProfile::count(),
            'verifiedSuppliers' => SupplierProfile::where('is_verified', true)->count(),
            'openBuyerRequests' => BuyerRequest::where('status', 'open')->count(),
            'slides' => Slide::count(),
            'users' => User::count(),
        ];

        return Inertia::render('admin/dashboard', [
            'metrics' => $metrics,
        ]);
    }
}
