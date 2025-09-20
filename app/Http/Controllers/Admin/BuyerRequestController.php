<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BuyerRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuyerRequestController extends Controller
{
    public function index(Request $request): Response
    {
        $requests = BuyerRequest::query()
            ->with(['buyer:id,name,email', 'category:id,name'])
            ->orderByDesc('created_at')
            ->paginate(15)
            ->through(fn (BuyerRequest $request) => [
                'id' => $request->id,
                'title' => $request->title,
                'status' => $request->status,
                'budget_min' => $request->budget_min,
                'budget_max' => $request->budget_max,
                'quantity' => $request->quantity,
                'unit' => $request->unit,
                'preferred_location' => $request->preferred_location,
                'lead_valid_until' => $request->lead_valid_until?->toDateString(),
                'created_at' => $request->created_at?->toDateTimeString(),
                'buyer' => [
                    'id' => $request->buyer->id,
                    'name' => $request->buyer->name,
                    'email' => $request->buyer->email,
                ],
                'category' => $request->category?->name,
            ]);

        return Inertia::render('admin/buyer-requests/index', [
            'requests' => $requests,
        ]);
    }

    public function update(Request $request, BuyerRequest $buyerRequest): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'max:50'],
            'preferred_location' => ['nullable', 'string', 'max:255'],
            'lead_valid_until' => ['nullable', 'date'],
        ]);

        $buyerRequest->update($data);

        return back()->with('status', 'Buying request updated');
    }

    public function destroy(BuyerRequest $buyerRequest): RedirectResponse
    {
        $buyerRequest->delete();

        return back()->with('status', 'Buying request removed');
    }
}
