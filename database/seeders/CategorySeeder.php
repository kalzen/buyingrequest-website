<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Industrial Machinery',
                'description' => 'Heavy-duty manufacturing equipment and automation solutions.',
                'icon' => 'Factory',
            ],
            [
                'name' => 'Consumer Electronics',
                'description' => 'Smart devices, accessories, and home electronics.',
                'icon' => 'Cpu',
            ],
            [
                'name' => 'Packaging & Printing',
                'description' => 'Custom packaging, labels, and sustainable materials.',
                'icon' => 'Box',
            ],
            [
                'name' => 'Construction Materials',
                'description' => 'Structural, finishing, and smart building solutions.',
                'icon' => 'Building',
            ],
            [
                'name' => 'Agriculture & Food',
                'description' => 'Fresh produce, processing equipment, and agri-tech.',
                'icon' => 'Leaf',
            ],
            [
                'name' => 'Textiles & Apparel',
                'description' => 'Fabrics, garments, and sustainable fashion sourcing.',
                'icon' => 'Shirt',
            ],
            [
                'name' => 'Health & Beauty',
                'description' => 'Personal care, wellness, and private label cosmetics.',
                'icon' => 'HeartPulse',
            ],
            [
                'name' => 'Logistics & Transportation',
                'description' => 'Freight forwarding, warehousing, and cross-border shipping.',
                'icon' => 'Truck',
            ],
        ];

        foreach ($categories as $data) {
            Category::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'icon' => $data['icon'],
                ],
            );
        }
    }
}
