<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\BuyerRequest;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Get buyers and suppliers
        $buyers = User::where('role', 'buyer')->get();
        $suppliers = User::where('role', 'supplier')->get();
        $requests = BuyerRequest::get();
        
        if ($buyers->isEmpty() || $suppliers->isEmpty() || $requests->isEmpty()) {
            $this->command->info('Not enough data to seed orders. Please run other seeders first.');
            return;
        }

        $products = [
            'Industrial Valves',
            'Steel Pipes',
            'Electronic Components',
            'Machinery Parts',
            'Packaging Materials',
            'Chemical Products',
            'Textile Materials',
            'Automotive Parts',
        ];

        $units = ['pieces', 'kg', 'meters', 'tons', 'liters', 'boxes'];
        $statuses = ['completed', 'delivered', 'shipped', 'in_production', 'confirmed', 'pending'];
        $currencies = ['USD', 'EUR', 'GBP'];

        foreach ($buyers as $buyer) {
            // Each buyer has 2-5 completed orders
            $orderCount = rand(2, 5);
            
            for ($i = 0; $i < $orderCount; $i++) {
                $supplier = $suppliers->random();
                $request = $requests->isNotEmpty() ? $requests->random() : null;
                $product = $products[array_rand($products)];
                $unit = $units[array_rand($units)];
                $quantity = rand(10, 1000);
                $unitPrice = rand(10, 500);
                $totalAmount = $quantity * $unitPrice;
                $status = $statuses[array_rand($statuses)];
                $currency = $currencies[array_rand($currencies)];

                Order::create([
                    'buyer_id' => $buyer->id,
                    'supplier_id' => $supplier->id,
                    'buyer_request_id' => $request ? $request->id : null,
                    'product_name' => $product,
                    'product_description' => "High quality {$product} suitable for industrial applications",
                    'quantity' => $quantity,
                    'unit' => $unit,
                    'unit_price' => $unitPrice,
                    'total_amount' => $totalAmount,
                    'currency' => $currency,
                    'status' => $status,
                    'expected_delivery_date' => now()->addDays(rand(7, 30)),
                    'actual_delivery_date' => $status === 'completed' || $status === 'delivered' ? now()->subDays(rand(1, 15)) : null,
                    'notes' => 'Please ensure quality standards are met.',
                ]);
            }
        }
    }
}