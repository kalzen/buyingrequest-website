<?php

namespace Database\Seeders;

use App\Models\Slide;
use Illuminate\Database\Seeder;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slides = [
            [
                'title' => 'Source smarter. Grow faster.',
                'subtitle' => 'Match with verified manufacturers and negotiate in one workspace.',
                'cta_label' => 'Start sourcing',
                'cta_route' => 'register',
                'image_url' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80',
                'position' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Power your supply chain with confidence',
                'subtitle' => 'Transparent profiles, compliance data, and real-time collaboration.',
                'cta_label' => 'Explore suppliers',
                'cta_route' => 'login',
                'image_url' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80',
                'position' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Post buying requests in minutes',
                'subtitle' => 'Launch RFQs, collect offers, and close deals without leaving SupplySphere.',
                'cta_label' => 'Post a request',
                'cta_route' => 'register',
                'image_url' => 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80',
                'position' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            Slide::updateOrCreate(
                ['position' => $slide['position']],
                $slide,
            );
        }
    }
}
