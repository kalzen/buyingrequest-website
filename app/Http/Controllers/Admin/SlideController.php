<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SlideController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/slides/index', [
            'slides' => Slide::orderBy('position')->get()->map(fn (Slide $slide) => [
                'id' => $slide->id,
                'title' => $slide->title,
                'subtitle' => $slide->subtitle,
                'cta_label' => $slide->cta_label,
                'cta_route' => $slide->cta_route,
                'image_url' => $slide->image_url,
                'position' => $slide->position,
                'is_active' => $slide->is_active,
            ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'cta_label' => ['nullable', 'string', 'max:120'],
            'cta_route' => ['nullable', 'string', 'max:255'],
            'image_url' => ['required', 'string', 'max:1024'],
            'position' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $data['position'] = $data['position'] ?? (Slide::max('position') + 1);

        Slide::create($data);

        return back()->with('status', 'Slide created');
    }

    public function update(Request $request, Slide $slide): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'cta_label' => ['nullable', 'string', 'max:120'],
            'cta_route' => ['nullable', 'string', 'max:255'],
            'image_url' => ['required', 'string', 'max:1024'],
            'position' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $slide->update($data);

        return back()->with('status', 'Slide updated');
    }

    public function destroy(Slide $slide): RedirectResponse
    {
        $slide->delete();

        return back()->with('status', 'Slide removed');
    }
}
