<?php

namespace Database\Seeders;

use App\Models\SupplierContact;
use App\Models\User;
use App\Models\BuyerRequest;
use Illuminate\Database\Seeder;

class SupplierContactSeeder extends Seeder
{
    public function run(): void
    {
        // Get buyers and suppliers
        $buyers = User::where('role', 'buyer')->get();
        $suppliers = User::where('role', 'supplier')->get();
        $requests = BuyerRequest::get();
        
        if ($buyers->isEmpty() || $suppliers->isEmpty() || $requests->isEmpty()) {
            $this->command->info('Not enough data to seed supplier contacts. Please run other seeders first.');
            return;
        }

        $contactTypes = ['inquiry', 'quote_request', 'follow_up', 'other'];
        $statuses = ['pending', 'replied', 'closed'];
        
        $subjects = [
            'Inquiry about Industrial Equipment',
            'Quote Request for Manufacturing Parts',
            'Follow up on Previous Discussion',
            'Request for Product Catalog',
            'Partnership Opportunity',
            'Price Inquiry for Bulk Orders',
            'Technical Specifications Request',
            'Delivery Schedule Inquiry',
        ];

        $messages = [
            'We are interested in your products and would like to know more details.',
            'Could you please provide a quote for the following requirements?',
            'Following up on our previous conversation about potential collaboration.',
            'We would like to request your latest product catalog.',
            'We see great potential for partnership between our companies.',
            'What are your prices for bulk orders of 1000+ units?',
            'Could you provide technical specifications for your products?',
            'What is your typical delivery schedule for international orders?',
        ];

        foreach ($buyers as $buyer) {
            // Each buyer contacts 3-8 suppliers (but not more than available)
            $contactCount = min(rand(3, 8), $suppliers->count());
            $suppliersToContact = $suppliers->random($contactCount);
            
            foreach ($suppliersToContact as $supplier) {
                SupplierContact::create([
                    'buyer_id' => $buyer->id,
                    'supplier_id' => $supplier->id,
                    'buyer_request_id' => $requests->isNotEmpty() ? $requests->random()->id : null,
                    'contact_type' => $contactTypes[array_rand($contactTypes)],
                    'subject' => $subjects[array_rand($subjects)],
                    'message' => $messages[array_rand($messages)],
                    'status' => $statuses[array_rand($statuses)],
                    'contacted_at' => now()->subDays(rand(1, 30)),
                    'replied_at' => rand(0, 1) ? now()->subDays(rand(1, 25)) : null,
                ]);
            }
        }
    }
}