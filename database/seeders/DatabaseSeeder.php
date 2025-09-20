<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test Buyer',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => User::ROLE_BUYER,
            ],
        );

        $this->call([
            CategorySeeder::class,
            KeywordSeeder::class,
            SupplierSeeder::class,
            BuyerRequestSeeder::class,
            PageSeeder::class,
            SlideSeeder::class,
            MediaSeeder::class,
        ]);
    }
}
