<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\SupplierProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(Request $request): Response
    {
        $suppliers = SupplierProfile::with(['user:id,name,email', 'categories:id,name'])
            ->featured()
            ->take(12)
            ->get()
            ->map(fn (SupplierProfile $profile) => [
                'id' => $profile->id,
                'slug' => $profile->slug,
                'companyName' => $profile->company_name,
                'headline' => $profile->headline,
                'location' => $profile->location,
                'rating' => $profile->rating,
                'isVerified' => $profile->is_verified,
                'logoUrl' => $profile->logo_url,
                'coverImageUrl' => $profile->cover_image_url,
                'categories' => $profile->categories->pluck('name'),
                'contactEmail' => $profile->user->email,
                'websiteUrl' => $profile->website_url,
                'url' => route('suppliers.show', $profile->slug),
            ]);

        $metrics = [
            'totalSuppliers' => SupplierProfile::count(),
            'verifiedSuppliers' => SupplierProfile::where('is_verified', true)->count(),
            'featuredSuppliers' => SupplierProfile::where('is_featured', true)->count(),
        ];

        return Inertia::render('suppliers/index', [
            'suppliers' => $suppliers,
            'metrics' => $metrics,
        ]);
    }

    public function show(SupplierProfile $supplierProfile): Response
    {
        $supplierProfile->load(['user:id,name,email', 'categories:id,name', 'keywords:id,name']);

        return Inertia::render('suppliers/show', [
            'supplier' => [
                'id' => $supplierProfile->id,
                'companyName' => $supplierProfile->company_name,
                'slug' => $supplierProfile->slug,
                'headline' => $supplierProfile->headline,
                'about' => $supplierProfile->about,
                'logoUrl' => $supplierProfile->logo_url,
                'coverImageUrl' => $supplierProfile->cover_image_url,
                'location' => $supplierProfile->location,
                'countriesServed' => $supplierProfile->countries_served ?? [],
                'foundedYear' => $supplierProfile->founded_year,
                'minOrderQuantity' => $supplierProfile->min_order_quantity,
                'minOrderValue' => $supplierProfile->min_order_value,
                'currency' => $supplierProfile->currency,
                'leadTimeDays' => $supplierProfile->lead_time_days,
                'responseTimeHours' => $supplierProfile->response_time_hours,
                'isVerified' => $supplierProfile->is_verified,
                'rating' => $supplierProfile->rating,
                'certifications' => $supplierProfile->certifications ?? [],
                'websiteUrl' => $supplierProfile->website_url,
                'categories' => $supplierProfile->categories->pluck('name'),
                'keywords' => $supplierProfile->keywords->pluck('name'),
            ],
        ]);
    }
}
