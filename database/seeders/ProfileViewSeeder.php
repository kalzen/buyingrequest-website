<?php

namespace Database\Seeders;

use App\Models\ProfileView;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProfileViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all suppliers
        $suppliers = User::where('role', 'supplier')->get();
        
        if ($suppliers->isEmpty()) {
            $this->command->warn('No supplier users found.');
            return;
        }

        // Get all buyers (potential viewers)
        $buyers = User::where('role', 'buyer')->get();

        $ips = [
            '192.168.1.1',
            '10.0.0.1',
            '172.16.0.1',
            '203.0.113.1',
            '198.51.100.1',
        ];

        $userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        ];

        foreach ($suppliers as $supplier) {
            // Each supplier gets 500-2500 views over last 90 days
            $numViews = rand(500, 2500);

            for ($i = 0; $i < $numViews; $i++) {
                // Some views are from logged-in buyers, some are anonymous
                $viewerId = (rand(1, 100) <= 60 && $buyers->isNotEmpty()) 
                    ? $buyers->random()->id 
                    : null;

                ProfileView::create([
                    'supplier_id' => $supplier->id,
                    'viewer_id' => $viewerId,
                    'viewer_ip' => $ips[array_rand($ips)],
                    'viewer_user_agent' => $userAgents[array_rand($userAgents)],
                    'referrer' => rand(1, 100) <= 30 ? 'https://google.com' : null,
                    'viewed_at' => now()->subDays(rand(0, 90))->subHours(rand(0, 23)),
                ]);
            }
        }

        $this->command->info('Profile views seeded successfully!');
    }
}
