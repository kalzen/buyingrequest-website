<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('supplier/profile');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_size' => 'nullable|string|max:50',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'business_type' => 'nullable|string|max:100',
            'headline' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:5000',
            'contact_name' => 'required|string|max:255',
            'contact_title' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:1000',
            'main_categories' => 'nullable|string|max:255',
            'production_capacity' => 'nullable|string|max:255',
            'min_order_quantity' => 'nullable|string|max:255',
            'lead_time' => 'nullable|string|max:255',
            'certifications' => 'nullable|string|max:2000',
            'quality_control' => 'nullable|string|max:2000',
            'export_countries' => 'nullable|string|max:500',
            'payment_terms' => 'nullable|string|max:100',
        ]);

        // Update user basic information
        auth()->user()->update([
            'name' => $validated['contact_name'],
            'email' => $validated['email'],
        ]);

        // Store additional supplier profile data
        // You can store this in user metadata or create a separate suppliers table
        $supplierData = collect($validated)->except(['contact_name', 'email'])->toArray();
        
        // For now, we'll assume you have a SupplierProfile model
        // You might want to create or update a SupplierProfile record here
        // SupplierProfile::updateOrCreate(['user_id' => auth()->id()], $supplierData);

        return redirect()->route('supplier.dashboard')
            ->with('success', 'Company profile updated successfully!');
    }
}
