<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function show(Category $category): Response
    {
        $category->load(['buyerRequests' => function ($query) {
            $query->open()
                ->with(['buyer:id,name', 'category:id,name'])
                ->orderByDesc('created_at');
        }]);

        $buyerRequests = $category->buyerRequests->values()->map(fn ($request) => [
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
            'createdAt' => optional($request->created_at)->toDateString(),
            'status' => $request->status,
            'buyer' => [
                'name' => $request->buyer->name,
            ],
        ])->all();

        return Inertia::render('categories/show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'icon' => $category->icon,
                'requestsCount' => count($buyerRequests),
            ],
            'buyerRequests' => $buyerRequests,
        ]);
    }
}


