<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('buyer/profile');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|string|max:20',
            'job_title' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'company_size' => 'nullable|string|max:50',
            'industry' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:100',
            'company_address' => 'nullable|string|max:1000',
            'preferred_currency' => 'nullable|string|max:3',
            'annual_volume' => 'nullable|string|max:50',
            'sourcing_notes' => 'nullable|string|max:2000',
        ]);

        // Update user basic information
        auth()->user()->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Store additional buyer profile data in user metadata or separate table
        // For now, we'll store it in a JSON field or you can create a separate buyers table
        $buyerData = collect($validated)->except(['name', 'email'])->toArray();
        
        // You can store this in user metadata or create a separate buyers table
        // auth()->user()->update(['buyer_profile' => $buyerData]);

        return redirect()->route('buyer.dashboard')
            ->with('success', 'Profile updated successfully!');
    }
}
