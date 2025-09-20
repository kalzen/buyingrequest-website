<?php

namespace App\Http\Controllers;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\SupplierProfile;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the marketplace landing page.
     */
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
            ])->all();

        $latestRequests = BuyerRequest::with(['category'])
            ->open()
            ->orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(fn (BuyerRequest $request) => [
                'id' => $request->id,
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

        $heroSlides = [
            [
                'title' => 'Source smarter. Grow faster.',
                'description' => 'Connect with verified suppliers worldwide and get tailored quotes within hours.',
                'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80',
                'cta' => 'Start sourcing',
                'ctaHref' => '/register',
            ],
            [
                'title' => 'Power your supply chain with confidence',
                'description' => 'Transparent supplier profiles, trustworthy data, and responsive support for every deal.',
                'image' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80',
                'cta' => 'Explore suppliers',
                'ctaHref' => '/login',
            ],
            [
                'title' => 'Post buying requests in minutes',
                'description' => 'Publish needs, collect offers, and negotiate all in one place with curated experts.',
                'image' => 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80',
                'cta' => 'Post a request',
                'ctaHref' => '/register',
            ],
        ];

        $stats = [
            'verifiedSuppliers' => SupplierProfile::where('is_verified', true)->count(),
            'activeBuyRequests' => BuyerRequest::open()->count(),
            'countriesCovered' => SupplierProfile::pluck('countries_served')->flatten()->unique()->count(),
        ];

        return Inertia::render('home', [
            'featuredSuppliers' => $featuredSuppliers,
            'latestRequests' => $latestRequests,
            'topCategories' => $topCategories,
            'heroSlides' => $heroSlides,
            'stats' => $stats,
        ]);
    }
}
