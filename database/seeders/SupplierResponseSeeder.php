<?php

namespace Database\Seeders;

use App\Models\BuyerRequest;
use App\Models\SupplierResponse;
use App\Models\User;
use Illuminate\Database\Seeder;

class SupplierResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get supplier users
        $suppliers = User::where('role', 'supplier')->get();
        
        if ($suppliers->isEmpty()) {
            $this->command->warn('No supplier users found. Please create supplier users first.');
            return;
        }

        // Get buyer requests
        $buyerRequests = BuyerRequest::all();
        
        if ($buyerRequests->isEmpty()) {
            $this->command->warn('No buyer requests found. Please run BuyerRequestSeeder first.');
            return;
        }

        $statuses = ['pending', 'accepted', 'rejected', 'negotiating'];
        $paymentTerms = ['T/T', 'L/C', 'D/P', 'D/A', '30% deposit, 70% before shipping'];
        
        $responses = [
            [
                'message' => 'We are pleased to submit our quotation for your industrial machinery requirements. Our company has 15 years of experience manufacturing precision components.',
                'quoted_price' => 45000,
                'delivery_time_days' => 30,
            ],
            [
                'message' => 'Thank you for your inquiry. We can supply the requested textile materials with competitive pricing and fast delivery.',
                'quoted_price' => 12500,
                'delivery_time_days' => 20,
            ],
            [
                'message' => 'We specialize in chemical products and can meet your specifications. Please find our detailed quote below.',
                'quoted_price' => 89000,
                'delivery_time_days' => 45,
            ],
            [
                'message' => 'Our factory is equipped to handle your order volume. We guarantee quality and timely delivery.',
                'quoted_price' => 32000,
                'delivery_time_days' => 25,
            ],
            [
                'message' => 'We have reviewed your RFQ and can offer competitive pricing with excellent quality assurance.',
                'quoted_price' => 56000,
                'delivery_time_days' => 35,
            ],
        ];

        foreach ($suppliers as $supplier) {
            // Each supplier responds to 3-5 random RFQs
            $numResponses = rand(3, 5);
            $selectedRequests = $buyerRequests->random(min($numResponses, $buyerRequests->count()));

            foreach ($selectedRequests as $index => $request) {
                $responseData = $responses[$index % count($responses)];
                
                SupplierResponse::create([
                    'supplier_id' => $supplier->id,
                    'buyer_request_id' => $request->id,
                    'message' => $responseData['message'],
                    'quoted_price' => $responseData['quoted_price'],
                    'currency' => $request->currency,
                    'delivery_time_days' => $responseData['delivery_time_days'],
                    'payment_terms' => $paymentTerms[array_rand($paymentTerms)],
                    'additional_notes' => 'All products come with 1-year warranty. We accept customization requests.',
                    'status' => $statuses[array_rand($statuses)],
                    'responded_at' => now()->subDays(rand(1, 30)),
                ]);
            }
        }

        $this->command->info('Supplier responses seeded successfully!');
    }
}
