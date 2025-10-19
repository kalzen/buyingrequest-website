<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Models\BuyerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RfqController extends Controller
{
    /**
     * Display a listing of RFQ opportunities.
     */
    public function index(): Response
    {
        $supplierId = auth()->id();
        
        // Get RFQs that supplier hasn't responded to yet
        $respondedRequestIds = \App\Models\SupplierResponse::where('supplier_id', $supplierId)
            ->pluck('buyer_request_id');
        
        $rfqs = BuyerRequest::with(['user', 'category', 'keywords'])
            ->where('status', 'open')
            ->whereNotIn('id', $respondedRequestIds)
            ->latest()
            ->paginate(20)
            ->through(function ($request) {
                return [
                    'id' => $request->id,
                    'title' => $request->title,
                    'slug' => $request->slug,
                    'summary' => $request->summary,
                    'budget_min' => $request->budget_min,
                    'budget_max' => $request->budget_max,
                    'currency' => $request->currency,
                    'preferred_location' => $request->preferred_location,
                    'status' => $request->status,
                    'created_at' => $request->created_at->format('M d, Y'),
                    'category' => $request->category ? ['name' => $request->category->name] : null,
                ];
            });

        return Inertia::render('supplier/rfq/index', [
            'rfqs' => $rfqs,
        ]);
    }

    /**
     * Display the specified RFQ.
     */
    public function show(BuyerRequest $buyerRequest): Response
    {
        $buyerRequest->load(['user', 'category', 'keywords']);

        $formattedRfq = [
            'id' => $buyerRequest->id,
            'title' => $buyerRequest->title,
            'slug' => $buyerRequest->slug,
            'summary' => $buyerRequest->summary,
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
            'budget_min' => $buyerRequest->budget_min,
            'budget_max' => $buyerRequest->budget_max,
            'currency' => $buyerRequest->currency,
            'preferred_location' => $buyerRequest->preferred_location,
            'status' => $buyerRequest->status,
            'notes' => $buyerRequest->notes,
            'created_at' => $buyerRequest->created_at->format('M d, Y'),
            'user' => [
                'name' => $buyerRequest->user->name,
                'email' => $buyerRequest->user->email,
            ],
            'category' => $buyerRequest->category ? ['name' => $buyerRequest->category->name] : null,
        ];

        return Inertia::render('supplier/rfq/show', [
            'rfq' => $formattedRfq,
        ]);
    }

    /**
     * Store a supplier response to an RFQ.
     */
    public function respond(Request $request, BuyerRequest $buyerRequest)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'quoted_price' => 'nullable|numeric|min:0',
            'currency' => 'required|string|max:3',
            'delivery_time_days' => 'nullable|integer|min:1',
            'payment_terms' => 'nullable|string|max:255',
            'additional_notes' => 'nullable|string',
        ]);

        \App\Models\SupplierResponse::create([
            'supplier_id' => auth()->id(),
            'buyer_request_id' => $buyerRequest->id,
            'message' => $validated['message'],
            'quoted_price' => $validated['quoted_price'] ?? null,
            'currency' => $validated['currency'],
            'delivery_time_days' => $validated['delivery_time_days'] ?? null,
            'payment_terms' => $validated['payment_terms'] ?? null,
            'additional_notes' => $validated['additional_notes'] ?? null,
            'status' => 'pending',
            'responded_at' => now(),
        ]);

        return redirect()->route('supplier.responses')
            ->with('success', 'Your response has been submitted successfully!');
    }
}
