<?php

namespace Database\Seeders;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\Keyword;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class BuyerRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');
        $keywords = Keyword::all()->keyBy('slug');

        $requests = [
            [
                'buyer' => [
                    'name' => 'Atlas Retail Group',
                    'email' => 'buyer-one@example.com',
                ],
                'title' => 'Seeking OEM smart home air purifiers',
                'summary' => 'Looking for private label HEPA air purifiers with Wi-Fi control and mobile app integration.',
                'description' => 'We need a long-term partner to supply smart air purifiers for North America and EU. Requirements include HEPA13 filter, IoT app, UL/CE certifications, and drop-tested packaging.',
                'category' => 'consumer-electronics',
                'quantity' => 2000,
                'unit' => 'pcs',
                'budget_min' => 120000,
                'budget_max' => 220000,
                'preferred_location' => 'East Asia',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(45),
                'keywords' => ['smart-home', 'iot-device', 'custom-packaging'],
            ],
            [
                'buyer' => [
                    'name' => 'GreenHarvest Foods',
                    'email' => 'buyer-two@example.com',
                ],
                'title' => 'Organic fertilizer pellets for Latin America distributors',
                'summary' => 'Need certified organic fertilizer pellets for agricultural partners in LATAM.',
                'description' => 'Specification: NPK 8-8-8, moisture control coating, available in 25kg bags. Supplier must have USDA Organic certification and offer private labeling.',
                'category' => 'agriculture-food',
                'quantity' => 600,
                'unit' => 'tons',
                'budget_min' => 85000,
                'budget_max' => 130000,
                'preferred_location' => 'South America',
                'shipping_terms' => 'CIF',
                'lead_valid_until' => now()->addDays(30),
                'keywords' => ['organic-fertilizer', 'cold-chain-logistics', 'eco-friendly-material'],
            ],
            [
                'buyer' => [
                    'name' => 'PulseWear Innovations',
                    'email' => 'buyer-three@example.com',
                ],
                'title' => 'Wearable fitness bands with advanced sensors',
                'summary' => 'Looking for ODM partner to produce next-gen wearable bands with ECG and body temperature sensors.',
                'description' => 'Need lightweight form factor, 7-day battery, BLE 5.0, waterproof rating IP68, custom firmware support. Certifications: FCC, CE.',
                'category' => 'consumer-electronics',
                'quantity' => 10000,
                'unit' => 'pcs',
                'budget_min' => 250000,
                'budget_max' => 480000,
                'preferred_location' => 'APAC',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(60),
                'keywords' => ['wearable-tech', 'iot-device', 'battery-storage'],
            ],
            [
                'buyer' => [
                    'name' => 'MetroBuild Contractors',
                    'email' => 'buyer-four@example.com',
                ],
                'title' => 'Lightweight modular housing panels',
                'summary' => 'Require modular housing panels with fire resistance and quick assembly features for urban projects.',
                'description' => 'Panels should integrate insulation, wiring conduits, acoustic dampening. Provide structural certifications for EU standards. Target monthly supply of 30 containers.',
                'category' => 'construction-materials',
                'quantity' => 3000,
                'unit' => 'sets',
                'budget_min' => 180000,
                'budget_max' => 320000,
                'preferred_location' => 'Europe',
                'shipping_terms' => 'CIF',
                'lead_valid_until' => now()->addDays(40),
                'keywords' => ['modular-housing', 'eco-friendly-material', 'heavy-machinery-rental'],
            ],
            [
                'buyer' => [
                    'name' => 'Aurora Beauty Labs',
                    'email' => 'buyer-five@example.com',
                ],
                'title' => 'Private label skincare ampoules',
                'summary' => 'Sourcing GMP facility for clean beauty ampoules with custom formulation services.',
                'description' => 'Need vegan, cruelty-free serums in 5ml ampoules, active ingredients: niacinamide, peptides. MOQ per SKU 5,000 units. Provide packaging co-development.',
                'category' => 'health-beauty',
                'quantity' => 10000,
                'unit' => 'pcs',
                'budget_min' => 55000,
                'budget_max' => 80000,
                'preferred_location' => 'South Korea',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(25),
                'keywords' => ['private-label-skincare', 'custom-packaging', 'cold-chain-logistics'],
            ],
            [
                'buyer' => [
                    'name' => 'UrbanCommuter Mobility',
                    'email' => 'buyer-six@example.com',
                ],
                'title' => 'Electric scooter drivetrain components',
                'summary' => 'Requesting long-term supplier for brushless motors and controllers for e-scooters.',
                'description' => 'Need 350W and 500W hub motors, matching controllers with CAN bus, IPX6 waterproofing. Prefer suppliers who can support OEM branding.',
                'category' => 'industrial-machinery',
                'quantity' => 15000,
                'unit' => 'sets',
                'budget_min' => 210000,
                'budget_max' => 360000,
                'preferred_location' => 'China',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(50),
                'keywords' => ['electric-vehicle-part', 'industrial-automation', 'led-lighting'],
            ],
        ];

        foreach ($requests as $data) {
            $buyer = User::updateOrCreate(
                ['email' => $data['buyer']['email']],
                [
                    'name' => $data['buyer']['name'],
                    'role' => User::ROLE_BUYER,
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ],
            );

            $categoryId = $categories[$data['category']]->id ?? null;

            $slug = Str::slug($data['title']);
            $existingSlugCount = BuyerRequest::where('slug', $slug)->exists();

            if ($existingSlugCount) {
                $slug .= '-' . Str::random(4);
            }

            $request = BuyerRequest::updateOrCreate(
                ['slug' => $slug],
                [
                    'user_id' => $buyer->id,
                    'category_id' => $categoryId,
                    'title' => $data['title'],
                    'summary' => $data['summary'],
                    'description' => $data['description'],
                    'quantity' => $data['quantity'],
                    'unit' => $data['unit'],
                    'hs_code' => fake()->numerify('########'),
                    'quality_requirements' => 'ISO 9001:2015 certified manufacturing facility required. All products must meet international quality standards.',
                    'packaging_specification' => 'Standard export packaging with proper labeling. Custom packaging available upon request.',
                    'terms_of_delivery' => $data['shipping_terms'],
                    'port_of_discharge' => fake()->randomElement(['Port of Los Angeles', 'Port of Long Beach', 'Port of Hamburg', 'Port of Rotterdam', 'Port of Singapore']),
                    'delivery_time' => fake()->randomElement(['30-45 days', '45-60 days', '60-90 days']),
                    'method_of_transport' => fake()->randomElement(['sea_freight', 'air_freight', 'road_transport']),
                    'payment_terms' => fake()->randomElement(['T/T_advance', 'L/C_at_sight', 'T/T_30_days']),
                    'budget_min' => $data['budget_min'],
                    'budget_max' => $data['budget_max'],
                    'currency' => 'USD',
                    'preferred_location' => $data['preferred_location'],
                    'shipping_terms' => $data['shipping_terms'],
                    'lead_valid_until' => $data['lead_valid_until'],
                    'status' => 'open',
                    'notes' => 'Please provide detailed specifications and samples if available. We are looking for long-term partnership.',
                    'attachments' => [
                        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
                    ],
                ],
            );

            $keywordIds = collect($data['keywords'])
                ->map(fn (string $slugKeyword) => $keywords[$slugKeyword]->id ?? null)
                ->filter()
                ->all();

            if ($keywordIds) {
                $request->keywords()->sync($keywordIds);
            }
        }
    }
}
