<?php

namespace App\Http\Middleware;

use App\Models\Page;
use App\Models\Slide;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $publishedPages = Page::published()
            ->get(['id', 'title', 'slug', 'hero_cta_route', 'meta'])
            ->map(function (Page $page) {
                $meta = $page->meta ?? [];
                $routeParams = $meta['cta_route_params'] ?? ['page' => $page->slug];

                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                    'routeName' => $page->hero_cta_route ?? 'pages.show',
                    'routeParams' => $routeParams,
                    'footerColumn' => $meta['footer_column'] ?? null,
                ];
            });

        $footerLinks = [
            'marketplace' => $publishedPages
                ->filter(fn ($page) => $page['footerColumn'] === 'marketplace')
                ->values(),
            'suppliers' => $publishedPages
                ->filter(fn ($page) => $page['footerColumn'] === 'suppliers')
                ->values(),
        ];

        $activeSlides = Slide::active()
            ->get()
            ->map(fn (Slide $slide) => [
                'id' => $slide->id,
                'title' => $slide->title,
                'subtitle' => $slide->subtitle,
                'cta_label' => $slide->cta_label,
                'cta_route' => $slide->cta_route,
                'image_url' => $slide->image_url,
                'position' => $slide->position,
            ]);

        return [
            ...parent::share($request),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'cms' => [
                'slides' => $activeSlides,
                'footerLinks' => $footerLinks,
                'contact' => [
                    'email' => config('app.contact_email', 'hello@supplysphere.com'),
                    'phone' => config('app.contact_phone', '+1 (888) 000-1234'),
                    'hours' => 'Mon - Fri, 9:00 - 18:00 (UTC+7)',
                    'locations' => ['Ho Chi Minh City', 'Singapore'],
                ],
            ],
        ];
    }
}


