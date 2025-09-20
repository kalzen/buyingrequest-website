<?php

namespace App\Http\Controllers;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\Slide;
use App\Models\SupplierProfile;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredSuppliers = SupplierProfile::with(['user', 'categories'])
            ->featured()
            ->orderByDesc('rating')
            ->take(6)
            ->get()
            ->map(fn (SupplierProfile $profile) => [
                'id' => $profile->id,
                'companyName' => $profile->company_name,
                'headline' => $profile->headline,
                'logoUrl' => $profile->logo_url,
                'coverImageUrl' => $profile->cover_image_url,
                'location' => $profile->location,
                'rating' => $profile->rating,
                'isVerified' => $profile->is_verified,
                'countriesServed' => $profile->countries_served ?? [],
                'categories' => $profile->categories->map(fn ($category) => [
                    'name' => $category->name,
                    'slug' => $category->slug,
                ])->all(),
                'url' => route('suppliers.show', $profile->slug),
            ])->all();

        $latestRequests = BuyerRequest::with(['category'])
            ->open()
            ->orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(fn (BuyerRequest $request) => [
                'id' => $request->id,
                'slug' => $request->slug,
                'title' => $request->title,
                'summary' => $request->summary,
                'category' => $request->category?->name,
                'budgetMin' => $request->budget_min,
                'budgetMax' => $request->budget_max,
                'currency' => $request->currency,
                'quantity' => $request->quantity,
                'unit' => $request->unit,
                'preferredLocation' => $request->preferred_location,
                'leadValidUntil' => optional($request->lead_valid_until)->toDateString(),
                'createdAt' => $request->created_at?->toDateString(),
                'status' => $request->status,
            ])->all();

        $topCategories = Category::withCount('buyerRequests')
            ->orderByDesc('buyer_requests_count')
            ->take(8)
            ->get()
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'icon' => $category->icon,
                'requestsCount' => $category->buyer_requests_count,
            ])->all();

        $slides = Slide::active()->get()->map(fn (Slide $slide) => [
            'id' => $slide->id,
            'title' => $slide->title,
            'description' => $slide->subtitle,
            'cta' => $slide->cta_label,
            'ctaRoute' => $slide->cta_route ?? 'home',
            'image' => $slide->image_url,
        ])->all();

        $stats = [
            'verifiedSuppliers' => SupplierProfile::where('is_verified', true)->count(),
            'activeBuyRequests' => BuyerRequest::open()->count(),
            'countriesCovered' => SupplierProfile::pluck('countries_served')->flatten()->unique()->count(),
        ];

        return Inertia::render('home', [
            'featuredSuppliers' => $featuredSuppliers,
            'latestRequests' => $latestRequests,
            'topCategories' => $topCategories,
            'heroSlides' => $slides,
            'stats' => $stats,
        ]);
    }
}




