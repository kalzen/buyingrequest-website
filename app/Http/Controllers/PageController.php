<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display the given page.
     */
    public function show(Page $page, Request $request): Response
    {
        abort_if($page->status !== 'published', 404);

        return Inertia::render('pages/show', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'subtitle' => $page->subtitle,
                'excerpt' => $page->excerpt,
                'heroImage' => $page->hero_image_url,
                'heroCtaLabel' => $page->hero_cta_label,
                'heroCtaRoute' => $page->hero_cta_route,
                'content' => $page->content ? json_decode($page->content, true) : null,
                'metaTitle' => $page->meta_title,
                'metaDescription' => $page->meta_description,
            ],
        ]);
    }
}

