<?php

namespace Database\Factories;

use App\Models\BuyerRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BuyerRequest>
 */
class BuyerRequestFactory extends Factory
{
    protected $model = BuyerRequest::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'user_id' => User::factory()->state(['role' => User::ROLE_BUYER]),
            'category_id' => Category::factory(),
            'title' => $title,
            'slug' => Str::slug($title . '-' . fake()->unique()->numberBetween(1000, 9999)),
            'summary' => fake()->sentence(12),
            'description' => fake()->paragraphs(3, true),
            'quantity' => fake()->numberBetween(100, 5000),
            'unit' => fake()->randomElement(['pcs', 'kg', 'tons', 'sets']),
            'budget_min' => fake()->randomFloat(2, 1000, 5000),
            'budget_max' => fake()->randomFloat(2, 7000, 20000),
            'currency' => 'USD',
            'preferred_location' => fake()->country(),
            'shipping_terms' => fake()->randomElement(['FOB', 'CIF', 'EXW']),
            'lead_valid_until' => fake()->dateTimeBetween('+7 days', '+90 days'),
            'status' => 'open',
            'attachments' => [
                'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
            ],
        ];
    }
}
