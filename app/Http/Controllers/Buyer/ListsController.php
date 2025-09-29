<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ListsController extends Controller
{
    public function activeRequests(): Response
    {
        $user = auth()->user();
        
        $requests = $user->buyerRequests()
            ->where('status', 'open')
            ->latest()
            ->paginate(10)
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
                    'lead_valid_until' => $request->lead_valid_until?->format('M d, Y'),
                    'status' => $request->status,
                    'views' => $request->views,
                    'created_at' => $request->created_at->format('M d, Y'),
                    'category' => $request->category?->name,
                ];
            });

        return Inertia::render('buyer/lists/active-requests', [
            'requests' => $requests,
        ]);
    }

    public function supplierContacts(): Response
    {
        $user = auth()->user();
        
        $contacts = $user->supplierContacts()
            ->with(['supplier', 'buyerRequest'])
            ->latest('contacted_at')
            ->paginate(10)
            ->through(function ($contact) {
                return [
                    'id' => $contact->id,
                    'subject' => $contact->subject,
                    'message' => $contact->message,
                    'contact_type' => $contact->contact_type,
                    'status' => $contact->status,
                    'contacted_at' => $contact->contacted_at->format('M d, Y H:i'),
                    'replied_at' => $contact->replied_at?->format('M d, Y H:i'),
                    'supplier' => [
                        'name' => $contact->supplier->name,
                        'email' => $contact->supplier->email,
                    ],
                    'buyer_request' => [
                        'id' => $contact->buyerRequest?->id,
                        'title' => $contact->buyerRequest?->title,
                    ],
                ];
            });

        return Inertia::render('buyer/lists/supplier-contacts', [
            'contacts' => $contacts,
        ]);
    }

    public function completedOrders(): Response
    {
        $user = auth()->user();
        
        $orders = $user->ordersAsBuyer()
            ->where('status', 'completed')
            ->with(['supplier', 'buyerRequest'])
            ->latest()
            ->paginate(10)
            ->through(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'product_name' => $order->product_name,
                    'product_description' => $order->product_description,
                    'quantity' => $order->quantity,
                    'unit' => $order->unit,
                    'unit_price' => $order->unit_price,
                    'total_amount' => $order->total_amount,
                    'currency' => $order->currency,
                    'status' => $order->status,
                    'expected_delivery_date' => $order->expected_delivery_date?->format('M d, Y'),
                    'actual_delivery_date' => $order->actual_delivery_date?->format('M d, Y'),
                    'created_at' => $order->created_at->format('M d, Y'),
                    'supplier' => [
                        'name' => $order->supplier->name,
                        'email' => $order->supplier->email,
                    ],
                    'buyer_request' => [
                        'id' => $order->buyerRequest?->id,
                        'title' => $order->buyerRequest?->title,
                    ],
                ];
            });

        return Inertia::render('buyer/lists/completed-orders', [
            'orders' => $orders,
        ]);
    }
}
