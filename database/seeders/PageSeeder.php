<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Solutions Overview',
                'subtitle' => 'Build resilient supply partnerships',
                'hero_image_url' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
                'hero_cta_label' => 'Talk to sourcing advisor',
                'hero_cta_route' => 'pages.show',
                'excerpt' => 'See how SupplySphere orchestrates sourcing workflows from RFQ to delivery.',
                'content' => json_encode([
                    ['type' => 'heading', 'level' => 2, 'content' => 'Why SupplySphere'],
                    ['type' => 'paragraph', 'content' => 'We connect verified manufacturers with fast-moving procurement teams. Build trust with transparency, real-time collaboration tools, and curated data.'],
                    ['type' => 'bullet_list', 'items' => [
                        'Qualified supplier discovery tailored to your industry',
                        'Control tower dashboards for RFQs and contracts',
                        'Guided onboarding with compliance automation',
                    ]],
                ]),
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'meta_title' => 'SupplySphere Solutions',
                'meta_description' => 'Explore the sourcing platform features enabling buyer & supplier collaboration.',
                'meta' => [
                    'cta_route_params' => ['page' => 'solutions-overview'],
                    'footer_column' => 'marketplace',
                ],
            ],
            [
                'title' => 'Help Center',
                'subtitle' => 'Guides, tutorials, and FAQs',
                'hero_image_url' => 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80',
                'hero_cta_label' => 'Browse topics',
                'hero_cta_route' => 'pages.show',
                'excerpt' => 'Find best practices on launching buying projects, verifying suppliers, and managing deals.',
                'content' => json_encode([
                    ['type' => 'heading', 'level' => 2, 'content' => 'Getting Started'],
                    ['type' => 'paragraph', 'content' => 'Launch RFQs in minutes using our guided project briefs. Invite teammates, add specs, and publish to the marketplace.'],
                    ['type' => 'heading', 'level' => 3, 'content' => 'Frequently Asked Questions'],
                    ['type' => 'bullet_list', 'items' => [
                        'How do I verify my supplier profile?',
                        'What files can I attach to a buying request?',
                        'Can I invite external auditors?',
                    ]],
                ]),
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'meta_title' => 'SupplySphere Help Center',
                'meta_description' => 'Support resources and product documentation for buyers and suppliers.',
                'meta' => [
                    'cta_route_params' => ['page' => 'help-center'],
                    'footer_column' => 'marketplace',
                ],
            ],
            [
                'title' => 'Success Stories',
                'subtitle' => 'Customer stories from global procurement leaders',
                'hero_image_url' => 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80',
                'hero_cta_label' => 'Share your story',
                'hero_cta_route' => 'pages.show',
                'excerpt' => 'Discover how brands accelerated time-to-market with trusted supplier partnerships.',
                'content' => json_encode([
                    ['type' => 'paragraph', 'content' => 'Brands across electronics, apparel, and consumer goods leverage SupplySphere to reduce lead times and mitigate supply risk.'],
                    ['type' => 'quote', 'content' => '“We sourced three ISO-certified partners in under two weeks.” – Atlas Retail Group'],
                ]),
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'meta_title' => 'SupplySphere Success Stories',
                'meta_description' => 'Case studies from enterprises scaling procurement with SupplySphere.',
                'meta' => [
                    'cta_route_params' => ['page' => 'success-stories'],
                    'footer_column' => 'suppliers',
                ],
            ],
            [
                'title' => 'Advertising Options',
                'subtitle' => 'Increase visibility with premium placements',
                'hero_image_url' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
                'hero_cta_label' => 'View packages',
                'hero_cta_route' => 'pages.show',
                'excerpt' => 'Highlight capabilities to high-intent buyers through targeted showcases and campaigns.',
                'content' => json_encode([
                    ['type' => 'heading', 'level' => 2, 'content' => 'Boost exposure'],
                    ['type' => 'paragraph', 'content' => 'Promote your catalog with sponsored RFQs, curated showcases, and home hero placements.'],
                ]),
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'meta_title' => 'SupplySphere Advertising',
                'meta_description' => 'Reach more procurement teams with targeted placements.',
                'meta' => [
                    'cta_route_params' => ['page' => 'advertising-options'],
                    'footer_column' => 'suppliers',
                ],
            ],
        ];

        foreach ($pages as $pageData) {
            $slug = Str::slug($pageData['title']);
            $pageData['meta']['slug'] = $slug;

            Page::updateOrCreate(
                ['slug' => $slug],
                $pageData,
            );
        }
    }
}
