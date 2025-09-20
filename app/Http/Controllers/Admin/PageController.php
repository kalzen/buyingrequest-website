<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(Request $request): Response
    {
        $pages = Page::query()
            ->orderByDesc('updated_at')
            ->paginate(10)
            ->through(fn (Page $page) => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'updated_at' => $page->updated_at?->toDateTimeString(),
                'published_at' => $page->published_at?->toDateTimeString(),
            ]);

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:pages,slug'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'hero_image_url' => ['nullable', 'string', 'max:1024'],
            'hero_cta_label' => ['nullable', 'string', 'max:120'],
            'hero_cta_route' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:512'],
            'content' => ['nullable', 'array'],
            'status' => ['required', 'in:draft,published'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:512'],
            'meta' => ['nullable', 'array'],
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['content'] = isset($data['content']) ? json_encode($data['content']) : null;
        $data['published_at'] = $data['status'] === 'published' ? now() : null;

        Page::create($data);

        return back()->with('status', 'Page created');
    }

    public function update(Request $request, Page $page): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:pages,slug,' . $page->id],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'hero_image_url' => ['nullable', 'string', 'max:1024'],
            'hero_cta_label' => ['nullable', 'string', 'max:120'],
            'hero_cta_route' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:512'],
            'content' => ['nullable', 'array'],
            'status' => ['required', 'in:draft,published'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:512'],
            'meta' => ['nullable', 'array'],
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['content'] = isset($data['content']) ? json_encode($data['content']) : null;
        $data['published_at'] = $data['status'] === 'published'
            ? ($page->published_at ?? now())
            : null;

        $page->update($data);

        return back()->with('status', 'Page updated');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return back()->with('status', 'Page removed');
    }
}
