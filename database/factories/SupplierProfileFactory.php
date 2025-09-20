<?php

namespace Database\Factories;

use App\Models\SupplierProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SupplierProfile>
 */
class SupplierProfileFactory extends Factory
{
    protected $model = SupplierProfile::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => User::ROLE_SUPPLIER]),
            'company_name' => fake()->company(),
            'headline' => fake()->sentence(6),
            'about' => fake()->paragraph(),
            'website_url' => fake()->url(),
            'logo_url' => 'https://images.unsplash.com/flagged/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=200&q=80',
            'cover_image_url' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
            'location' => fake()->city() . ', ' . fake()->country(),
            'countries_served' => fake()->randomElements([
                'United States',
                'China',
                'Vietnam',
                'Germany',
                'India',
                'Brazil',
            ], 3),
            'founded_year' => fake()->numberBetween(1995, 2022),
            'min_order_quantity' => fake()->numberBetween(50, 1000),
            'min_order_value' => fake()->randomFloat(2, 500, 15000),
            'currency' => 'USD',
            'lead_time_days' => fake()->numberBetween(7, 30),
            'response_time_hours' => fake()->numberBetween(6, 48),
            'is_verified' => fake()->boolean(70),
            'is_featured' => fake()->boolean(50),
            'rating' => fake()->randomFloat(2, 3.5, 5),
            'certifications' => [fake()->randomElement(['ISO 9001', 'CE', 'RoHS', 'GMP'])],
            'social_links' => [
                'linkedin' => 'https://www.linkedin.com/company/' . fake()->slug(),
                'website' => fake()->url(),
            ],
        ];
    }
}
