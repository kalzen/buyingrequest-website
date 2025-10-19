<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of supplier orders.
     */
    public function index(): Response
    {
        $orders = Order::with(['buyer', 'buyerRequest'])
            ->where('supplier_id', auth()->id())
            ->latest()
            ->paginate(20)
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
                    'buyer' => [
                        'name' => $order->buyer->name,
                        'email' => $order->buyer->email,
                    ],
                    'buyer_request' => $order->buyerRequest ? [
                        'id' => $order->buyerRequest->id,
                        'title' => $order->buyerRequest->title,
                    ] : null,
                ];
            });

        return Inertia::render('supplier/orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): Response
    {
        // Check if the order belongs to the authenticated supplier
        if ($order->supplier_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this order.');
        }
        
        $order->load(['buyer', 'buyerRequest']);

        $formattedOrder = [
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
            'notes' => $order->notes,
            'buyer' => [
                'name' => $order->buyer->name,
                'email' => $order->buyer->email,
            ],
            'buyer_request' => $order->buyerRequest ? [
                'id' => $order->buyerRequest->id,
                'title' => $order->buyerRequest->title,
            ] : null,
        ];

        return Inertia::render('supplier/orders/show', [
            'order' => $formattedOrder,
        ]);
    }
}
