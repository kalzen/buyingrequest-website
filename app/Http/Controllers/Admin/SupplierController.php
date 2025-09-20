<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupplierProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(Request $request): Response
    {
        $suppliers = SupplierProfile::with(['user:id,name,email', 'categories:id,name'])
            ->orderByDesc('created_at')
            ->paginate(15)
            ->through(fn (SupplierProfile $profile) => [
                'id' => $profile->id,
                'company_name' => $profile->company_name,
                'headline' => $profile->headline,
                'location' => $profile->location,
                'is_verified' => $profile->is_verified,
                'is_featured' => $profile->is_featured,
                'rating' => $profile->rating,
                'response_time_hours' => $profile->response_time_hours,
                'lead_time_days' => $profile->lead_time_days,
                'categories' => $profile->categories->pluck('name'),
                'user' => [
                    'id' => $profile->user->id,
                    'name' => $profile->user->name,
                    'email' => $profile->user->email,
                ],
            ]);

        return Inertia::render('admin/suppliers/index', [
            'suppliers' => $suppliers,
        ]);
    }

    public function update(Request $request, SupplierProfile $supplier): RedirectResponse
    {
        $data = $request->validate([
            'is_verified' => ['required', 'boolean'],
            'is_featured' => ['required', 'boolean'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'response_time_hours' => ['nullable', 'integer', 'min:0'],
            'lead_time_days' => ['nullable', 'integer', 'min:0'],
        ]);

        $supplier->update($data);

        return back()->with('status', 'Supplier updated');
    }
}
