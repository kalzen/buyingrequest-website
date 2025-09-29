<?php

namespace App\Http\Controllers\Marketplace;

use App\Http\Controllers\Controller;
use App\Models\BuyerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuyerRequestController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('requests/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Basic Information
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:1000',
            'description' => 'nullable|string|max:5000',
            'category' => 'nullable|string|max:255',
            
            // Goods Details
            'quantity' => 'nullable|integer|min:1',
            'unit' => 'nullable|string|max:100',
            'hs_code' => 'nullable|string|max:50',
            'quality_requirements' => 'nullable|string|max:1000',
            'packaging_specification' => 'nullable|string|max:1000',
            
            // Terms of Trade
            'terms_of_delivery' => 'nullable|string|max:100',
            'port_of_discharge' => 'nullable|string|max:255',
            'delivery_time' => 'nullable|string|max:255',
            'method_of_transport' => 'nullable|string|max:255',
            'payment_terms' => 'nullable|string|max:255',
            
            // Budget & Location
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0',
            'currency' => 'required|string|max:3',
            'preferred_location' => 'nullable|string|max:255',
            'lead_valid_until' => 'nullable|date|after:today',
            'shipping_terms' => 'nullable|string|max:1000',
            
            // Notes
            'notes' => 'nullable|string|max:2000',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['status'] = 'open';

        $buyerRequest = BuyerRequest::create($validated);

        return redirect()->route('requests.show', $buyerRequest)
            ->with('success', 'RFQ request created successfully!');
    }

    public function show(BuyerRequest $buyerRequest): Response
    {
        // Allow viewing all requests regardless of status
        // abort_if($buyerRequest->status !== 'open', 404);

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
                'hs_code' => $buyerRequest->hs_code,
                'quality_requirements' => $buyerRequest->quality_requirements,
                'packaging_specification' => $buyerRequest->packaging_specification,
                'terms_of_delivery' => $buyerRequest->terms_of_delivery,
                'port_of_discharge' => $buyerRequest->port_of_discharge,
                'delivery_time' => $buyerRequest->delivery_time,
                'method_of_transport' => $buyerRequest->method_of_transport,
                'payment_terms' => $buyerRequest->payment_terms,
                'budgetMin' => $buyerRequest->budget_min,
                'budgetMax' => $buyerRequest->budget_max,
                'currency' => $buyerRequest->currency,
                'preferredLocation' => $buyerRequest->preferred_location,
                'shippingTerms' => $buyerRequest->shipping_terms,
                'leadValidUntil' => optional($buyerRequest->lead_valid_until)->toDateString(),
                'notes' => $buyerRequest->notes,
                'status' => $buyerRequest->status,
                'attachments' => $buyerRequest->attachments,
                'buyer' => [
                    'name' => $buyerRequest->buyer->name,
                ],
                'createdAt' => optional($buyerRequest->created_at)->toDateString(),
            ],
        ]);
    }
}