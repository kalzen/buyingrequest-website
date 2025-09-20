<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Keyword;
use App\Models\SupplierProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');
        $keywords = Keyword::all()->keyBy('slug');

        $suppliers = [
            [
                'user' => [
                    'name' => 'Orangenet Manufacturing Co.',
                    'email' => 'supplier-one@example.com',
                ],
                'profile' => [
                    'company_name' => 'Orangenet Manufacturing Co.',
                    'headline' => 'Precision industrial automation solutions',
                    'about' => 'We build turnkey automation lines, smart robotics, and industrial IoT systems for factories scaling globally.',
                    'website_url' => 'https://orangenet-industries.example.com',
                    'logo_url' => 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=200&q=80',
                    'cover_image_url' => 'https://images.unsplash.com/photo-1580894897200-6db2676fa8f0?auto=format&fit=crop&w=1600&q=80',
                    'location' => 'Shenzhen, China',
                    'countries_served' => ['China', 'Vietnam', 'United States', 'Germany'],
                    'founded_year' => 2012,
                    'min_order_quantity' => 20,
                    'min_order_value' => 8000,
                    'lead_time_days' => 25,
                    'response_time_hours' => 8,
                    'is_verified' => true,
                    'is_featured' => true,
                    'rating' => 4.8,
                    'certifications' => ['ISO 9001', 'CE'],
                    'social_links' => [
                        'linkedin' => 'https://www.linkedin.com/company/orangenet-manufacturing',
                    ],
                ],
                'categories' => ['industrial-machinery', 'consumer-electronics'],
                'keywords' => ['industrial-automation', 'cnc-machining', 'iot-device'],
            ],
            [
                'user' => [
                    'name' => 'Cascade Logistics Alliance',
                    'email' => 'supplier-two@example.com',
                ],
                'profile' => [
                    'company_name' => 'Cascade Logistics Alliance',
                    'headline' => 'Global cold-chain and cross-border fulfillment',
                    'about' => 'Specialized logistics network offering temperature controlled storage, bonded warehousing, and fulfillment across 40+ countries.',
                    'website_url' => 'https://cascadelogistics.example.com',
                    'logo_url' => 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=200&q=80',
                    'cover_image_url' => 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=1600&q=80',
                    'location' => 'Rotterdam, Netherlands',
                    'countries_served' => ['Netherlands', 'United Kingdom', 'Germany', 'United States'],
                    'founded_year' => 2008,
                    'min_order_quantity' => 5,
                    'min_order_value' => 1200,
                    'lead_time_days' => 10,
                    'response_time_hours' => 12,
                    'is_verified' => true,
                    'is_featured' => true,
                    'rating' => 4.6,
                    'certifications' => ['ISO 22000'],
                    'social_links' => [
                        'linkedin' => 'https://www.linkedin.com/company/cascade-logistics-alliance',
                    ],
                ],
                'categories' => ['logistics-transportation', 'agriculture-food'],
                'keywords' => ['cold-chain-logistics', 'pet-food'],
            ],
            [
                'user' => [
                    'name' => 'HelioSmart Energy Group',
                    'email' => 'supplier-three@example.com',
                ],
                'profile' => [
                    'company_name' => 'HelioSmart Energy Group',
                    'headline' => 'Complete solar + storage solutions for commercial facilities',
                    'about' => 'Designing bankable solar farms and integrated energy management systems spanning APAC and LATAM regions.',
                    'website_url' => 'https://heliosmart.example.com',
                    'logo_url' => 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=200&q=80',
                    'cover_image_url' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
                    'location' => 'Ho Chi Minh City, Vietnam',
                    'countries_served' => ['Vietnam', 'Singapore', 'Thailand', 'Philippines'],
                    'founded_year' => 2015,
                    'min_order_quantity' => 10,
                    'min_order_value' => 15000,
                    'lead_time_days' => 35,
                    'response_time_hours' => 6,
                    'is_verified' => true,
                    'is_featured' => true,
                    'rating' => 4.9,
                    'certifications' => ['ISO 14001', 'IEC 61215'],
                    'social_links' => [
                        'linkedin' => 'https://www.linkedin.com/company/heliosmart-energy',
                    ],
                ],
                'categories' => ['industrial-machinery', 'construction-materials'],
                'keywords' => ['solar-panel', 'battery-storage', 'smart-home'],
            ],
            [
                'user' => [
                    'name' => 'NovaForm Packaging Lab',
                    'email' => 'supplier-four@example.com',
                ],
                'profile' => [
                    'company_name' => 'NovaForm Packaging Lab',
                    'headline' => 'Premium custom packaging with sustainable materials',
                    'about' => 'Helping global lifestyle brands create delightful unboxing experiences with recyclable, low MOQ packaging.',
                    'website_url' => 'https://novaform-packaging.example.com',
                    'logo_url' => 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=200&q=80',
                    'cover_image_url' => 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
                    'location' => 'Los Angeles, USA',
                    'countries_served' => ['United States', 'Canada', 'Mexico'],
                    'founded_year' => 2018,
                    'min_order_quantity' => 300,
                    'min_order_value' => 5000,
                    'lead_time_days' => 18,
                    'response_time_hours' => 9,
                    'is_verified' => false,
                    'is_featured' => false,
                    'rating' => 4.4,
                    'certifications' => ['FSC'],
                    'social_links' => [
                        'linkedin' => 'https://www.linkedin.com/company/novaform-packaging-lab',
                    ],
                ],
                'categories' => ['packaging-printing', 'consumer-electronics'],
                'keywords' => ['custom-packaging', 'eco-friendly-material'],
            ],
            [
                'user' => [
                    'name' => 'Verde Textile Collective',
                    'email' => 'supplier-five@example.com',
                ],
                'profile' => [
                    'company_name' => 'Verde Textile Collective',
                    'headline' => 'Regenerative textiles & private label apparel',
                    'about' => 'A fair-trade network of mills delivering sustainable fabrics, smart wearables, and custom fashion development.',
                    'website_url' => 'https://verdetextile.example.com',
                    'logo_url' => 'https://images.unsplash.com/photo-1521572163474-dbf8a1a7103c?auto=format&fit=crop&w=200&q=80',
                    'cover_image_url' => 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80',
                    'location' => 'Lisbon, Portugal',
                    'countries_served' => ['Portugal', 'Spain', 'France', 'United Kingdom'],
                    'founded_year' => 2016,
                    'min_order_quantity' => 150,
                    'min_order_value' => 4000,
                    'lead_time_days' => 22,
                    'response_time_hours' => 10,
                    'is_verified' => true,
                    'is_featured' => true,
                    'rating' => 4.7,
                    'certifications' => ['GOTS', 'Fair Trade'],
                    'social_links' => [
                        'linkedin' => 'https://www.linkedin.com/company/verde-textile-collective',
                    ],
                ],
                'categories' => ['textiles-apparel', 'health-beauty'],
                'keywords' => ['sustainable-textile', 'wearable-tech', 'private-label-skincare'],
            ],
        ];

        foreach ($suppliers as $supplierData) {
            $user = User::updateOrCreate(
                ['email' => $supplierData['user']['email']],
                [
                    'name' => $supplierData['user']['name'],
                    'role' => User::ROLE_SUPPLIER,
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ],
            );

            $profileValues = $supplierData['profile'];
            $profileValues['user_id'] = $user->id;

            $profile = SupplierProfile::updateOrCreate(
                ['user_id' => $user->id],
                $profileValues,
            );

            $categoryIds = collect($supplierData['categories'])
                ->map(fn (string $slug) => $categories[$slug]->id ?? null)
                ->filter()
                ->all();

            $keywordIds = collect($supplierData['keywords'])
                ->map(fn (string $slug) => $keywords[$slug]->id ?? null)
                ->filter()
                ->all();

            if ($categoryIds) {
                $profile->categories()->sync($categoryIds);
            }

            if ($keywordIds) {
                $profile->keywords()->sync($keywordIds);
            }
        }
    }
}
