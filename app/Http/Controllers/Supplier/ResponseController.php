<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Models\SupplierResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResponseController extends Controller
{
    /**
     * Display a listing of supplier responses.
     */
    public function index(): Response
    {
        $responses = SupplierResponse::with(['buyerRequest', 'buyerRequest.user'])
            ->where('supplier_id', auth()->id())
            ->latest()
            ->paginate(20)
            ->through(function ($response) {
                return [
                    'id' => $response->id,
                    'message' => $response->message,
                    'quoted_price' => $response->quoted_price,
                    'currency' => $response->currency,
                    'delivery_time_days' => $response->delivery_time_days,
                    'payment_terms' => $response->payment_terms,
                    'status' => $response->status,
                    'responded_at' => $response->responded_at->format('M d, Y'),
                    'created_at' => $response->created_at->format('M d, Y'),
                    'buyer_request' => [
                        'id' => $response->buyerRequest->id,
                        'title' => $response->buyerRequest->title,
                        'user' => [
                            'name' => $response->buyerRequest->user->name,
                        ],
                    ],
                ];
            });

        return Inertia::render('supplier/responses/index', [
            'responses' => $responses,
        ]);
    }

    /**
     * Display the specified response.
     */
    public function show(SupplierResponse $response): Response
    {
        // Check if the response belongs to the authenticated supplier
        if ($response->supplier_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this response.');
        }
        
        $response->load(['buyerRequest', 'buyerRequest.user']);

        $formattedResponse = [
            'id' => $response->id,
            'message' => $response->message,
            'quoted_price' => $response->quoted_price,
            'currency' => $response->currency,
            'delivery_time_days' => $response->delivery_time_days,
            'payment_terms' => $response->payment_terms,
            'additional_notes' => $response->additional_notes,
            'status' => $response->status,
            'responded_at' => $response->responded_at->format('M d, Y'),
            'buyer_request' => [
                'id' => $response->buyerRequest->id,
                'title' => $response->buyerRequest->title,
                'summary' => $response->buyerRequest->summary,
                'user' => [
                    'name' => $response->buyerRequest->user->name,
                    'email' => $response->buyerRequest->user->email,
                ],
            ],
        ];

        return Inertia::render('supplier/responses/show', [
            'response' => $formattedResponse,
        ]);
    }

    /**
     * Show the form for editing the response.
     */
    public function edit(SupplierResponse $response): Response
    {
        // Check authorization
        if ($response->supplier_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this response.');
        }

        $response->load(['buyerRequest']);

        $formattedResponse = [
            'id' => $response->id,
            'message' => $response->message,
            'quoted_price' => $response->quoted_price,
            'currency' => $response->currency,
            'delivery_time_days' => $response->delivery_time_days,
            'payment_terms' => $response->payment_terms,
            'additional_notes' => $response->additional_notes,
            'status' => $response->status,
            'buyer_request' => [
                'id' => $response->buyerRequest->id,
                'title' => $response->buyerRequest->title,
                'summary' => $response->buyerRequest->summary,
            ],
        ];

        return Inertia::render('supplier/responses/edit', [
            'response' => $formattedResponse,
        ]);
    }

    /**
     * Update the specified response.
     */
    public function update(Request $request, SupplierResponse $response)
    {
        // Check authorization
        if ($response->supplier_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this response.');
        }

        $validated = $request->validate([
            'message' => 'required|string',
            'quoted_price' => 'nullable|numeric|min:0',
            'currency' => 'required|string|max:3',
            'delivery_time_days' => 'nullable|integer|min:1',
            'payment_terms' => 'nullable|string|max:255',
            'additional_notes' => 'nullable|string',
        ]);

        $response->update($validated);

        return redirect()->route('supplier.responses.show', $response->id)
            ->with('success', 'Response updated successfully!');
    }

    /**
     * Withdraw (soft delete) the response.
     */
    public function destroy(SupplierResponse $response)
    {
        // Check authorization
        if ($response->supplier_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this response.');
        }

        // Instead of deleting, we'll mark as withdrawn
        $response->update(['status' => 'withdrawn']);

        return redirect()->route('supplier.responses')
            ->with('success', 'Response withdrawn successfully!');
    }
}
