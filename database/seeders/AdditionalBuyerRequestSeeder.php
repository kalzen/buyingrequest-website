<?php

namespace Database\Seeders;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdditionalBuyerRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find specific buyer by email
        $buyer = User::where('email', 'manhto109@gmail.com')->where('role', 'buyer')->first();
        $categories = Category::all()->keyBy('slug');

        if (!$buyer) {
            $this->command->info('Buyer with email manhto109@gmail.com not found. Creating one...');
            $buyer = User::create([
                'name' => 'Manh To',
                'email' => 'manhto109@gmail.com',
                'role' => User::ROLE_BUYER,
                'password' => \Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        }

        $requests = [
            [
                'title' => 'High-Quality LED Strip Lights for Commercial Use',
                'summary' => 'Need premium LED strip lights with high CRI and dimming capabilities for commercial lighting projects.',
                'description' => 'Looking for LED strip lights with minimum 90 CRI, 3000K-4000K color temperature range, IP65 rating, and 0-10V dimming control.',
                'category' => 'led-lighting',
                'quantity' => 5000,
                'unit' => 'meters',
                'budget_min' => 25000,
                'budget_max' => 45000,
                'preferred_location' => 'China',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(35),
            ],
            [
                'title' => 'Industrial Conveyor Belt Systems',
                'summary' => 'Seeking modular conveyor belt systems for warehouse automation.',
                'description' => 'Need heavy-duty conveyor systems with variable speed control, safety sensors, and modular design.',
                'category' => 'industrial-automation',
                'quantity' => 20,
                'unit' => 'sets',
                'budget_min' => 180000,
                'budget_max' => 320000,
                'preferred_location' => 'Germany',
                'shipping_terms' => 'CIF',
                'lead_valid_until' => now()->addDays(45),
            ],
            [
                'title' => 'Custom Injection Molding Services',
                'summary' => 'Looking for injection molding partner for automotive parts production.',
                'description' => 'Need high-precision injection molding for ABS and polycarbonate automotive components.',
                'category' => 'automotive-parts',
                'quantity' => 100000,
                'unit' => 'pieces',
                'budget_min' => 150000,
                'budget_max' => 280000,
                'preferred_location' => 'Taiwan',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(50),
            ],
            [
                'title' => 'Precision CNC Machining Services',
                'summary' => 'Require CNC machining for aerospace-grade aluminum components.',
                'description' => 'Need CNC machining for 6061-T6 aluminum parts with tight tolerances.',
                'category' => 'precision-machining',
                'quantity' => 2000,
                'unit' => 'pieces',
                'budget_min' => 85000,
                'budget_max' => 150000,
                'preferred_location' => 'Japan',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(40),
            ],
            [
                'title' => 'Eco-Friendly Packaging Materials',
                'summary' => 'Sourcing biodegradable packaging solutions for food industry.',
                'description' => 'Need compostable packaging materials for food products with FDA standards.',
                'category' => 'eco-friendly-material',
                'quantity' => 10000,
                'unit' => 'rolls',
                'budget_min' => 45000,
                'budget_max' => 75000,
                'preferred_location' => 'Europe',
                'shipping_terms' => 'CIF',
                'lead_valid_until' => now()->addDays(30),
            ],
            [
                'title' => 'Solar Panel Mounting Systems',
                'summary' => 'Need roof mounting systems for residential solar installations.',
                'description' => 'Looking for aluminum mounting rails and brackets for 400W panels.',
                'category' => 'solar-energy',
                'quantity' => 500,
                'unit' => 'sets',
                'budget_min' => 35000,
                'budget_max' => 60000,
                'preferred_location' => 'United States',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(25),
            ],
            [
                'title' => 'Medical Device Components',
                'summary' => 'Seeking FDA-approved components for medical devices.',
                'description' => 'Need precision-machined stainless steel components for medical devices.',
                'category' => 'medical-devices',
                'quantity' => 5000,
                'unit' => 'pieces',
                'budget_min' => 120000,
                'budget_max' => 200000,
                'preferred_location' => 'Switzerland',
                'shipping_terms' => 'CIF',
                'lead_valid_until' => now()->addDays(60),
            ],
            [
                'title' => 'Wireless IoT Sensors',
                'summary' => 'Need battery-powered IoT sensors for industrial monitoring.',
                'description' => 'Looking for LoRaWAN-compatible sensors for temperature and humidity monitoring.',
                'category' => 'iot-device',
                'quantity' => 1000,
                'unit' => 'pieces',
                'budget_min' => 75000,
                'budget_max' => 130000,
                'preferred_location' => 'South Korea',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(35),
            ],
            [
                'title' => 'Heavy Machinery Rental Services',
                'summary' => 'Seeking construction equipment rental for infrastructure projects.',
                'description' => 'Need excavators, bulldozers, and cranes for 12-month project.',
                'category' => 'heavy-machinery-rental',
                'quantity' => 15,
                'unit' => 'units',
                'budget_min' => 200000,
                'budget_max' => 400000,
                'preferred_location' => 'Thailand',
                'shipping_terms' => 'DAP',
                'lead_valid_until' => now()->addDays(20),
            ],
            [
                'title' => 'Custom Textile Manufacturing',
                'summary' => 'Need organic cotton fabric production for sustainable fashion.',
                'description' => 'Looking for GOTS-certified organic cotton fabric in various weights.',
                'category' => 'textile-manufacturing',
                'quantity' => 50000,
                'unit' => 'meters',
                'budget_min' => 95000,
                'budget_max' => 170000,
                'preferred_location' => 'India',
                'shipping_terms' => 'FOB',
                'lead_valid_until' => now()->addDays(40),
            ],
        ];

        $statuses = ['open', 'closed', 'pending'];
        $currencies = ['USD', 'EUR', 'GBP'];

        foreach ($requests as $index => $data) {
            // Use the specific buyer
            // Get random category or use default
            $categoryId = null;
            if (isset($data['category']) && isset($categories[$data['category']])) {
                $categoryId = $categories[$data['category']]->id;
            } elseif ($categories->isNotEmpty()) {
                $categoryId = $categories->random()->id;
            }

            // Generate unique slug
            $slug = Str::slug($data['title']) . '-' . Str::random(6);

            BuyerRequest::create([
                'user_id' => $buyer->id,
                'category_id' => $categoryId,
                'title' => $data['title'],
                'slug' => $slug,
                'summary' => $data['summary'],
                'description' => $data['description'],
                'quantity' => $data['quantity'],
                'unit' => $data['unit'],
                'hs_code' => fake()->numerify('########'),
                'quality_requirements' => 'ISO 9001:2015 certified manufacturing facility required.',
                'packaging_specification' => 'Standard export packaging with proper labeling.',
                'terms_of_delivery' => $data['shipping_terms'],
                'port_of_discharge' => fake()->randomElement(['Port of Los Angeles', 'Port of Hamburg', 'Port of Singapore']),
                'delivery_time' => fake()->randomElement(['30-45 days', '45-60 days', '60-90 days']),
                'method_of_transport' => fake()->randomElement(['sea_freight', 'air_freight', 'road_transport']),
                'payment_terms' => fake()->randomElement(['T/T_advance', 'L/C_at_sight', 'T/T_30_days']),
                'budget_min' => $data['budget_min'],
                'budget_max' => $data['budget_max'],
                'currency' => fake()->randomElement($currencies),
                'preferred_location' => $data['preferred_location'],
                'shipping_terms' => $data['shipping_terms'],
                'lead_valid_until' => $data['lead_valid_until'],
                'status' => fake()->randomElement($statuses),
                'notes' => 'Please provide detailed specifications and samples if available.',
                'attachments' => [
                    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80'
                ],
                'views' => fake()->numberBetween(10, 500),
                'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
            ]);
        }

        $this->command->info('Created ' . count($requests) . ' buyer requests for manhto109@gmail.com');
    }
}