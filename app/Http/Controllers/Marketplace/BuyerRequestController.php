<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\BuyerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuyerRequestController extends Controller
{
    public function show(BuyerRequest $buyerRequest): Response
    {
        abort_if($buyerRequest->status !== 'open', 404);

        $buyerRequest->load(['buyer:id,name,email', 'category:id,name']);

        return Inertia::render('requests/show', [
            'request' => [
                'id' => $buyerRequest->id,
                'title' => $buyerRequest->title,
                'summary' => $buyerRequest->summary,
                'category' => $buyerRequest->category?->name,
                'description' => $buyerRequest->description,
                'quantity' => $buyerRequest->quantity,
                'unit' => $buyerRequest->unit,
                'budgetMin' => $buyerRequest->budget_min,
                'budgetMax' => $buyerRequest->budget_max,
                'currency' => $buyerRequest->currency,
                'preferredLocation' => $buyerRequest->preferred_location,
                'shippingTerms' => $buyerRequest->shipping_terms,
                'leadValidUntil' => optional($buyerRequest->lead_valid_until)->toDateString(),
                'attachments' => $buyerRequest->attachments,
                'buyer' => [
                    'name' => $buyerRequest->buyer->name,
                ],
                'createdAt' => optional($buyerRequest->created_at)->toDateString(),
            ],
        ]);
    }
}
