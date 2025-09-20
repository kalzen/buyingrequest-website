<?php

namespace Database\Seeders;

use App\Models\MediaFile;
use App\Models\MediaFolder;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $root = MediaFolder::updateOrCreate(
            ['slug' => 'root-media-library'],
            ['name' => 'Root Library', 'disk' => 'public']
        );

        $marketing = MediaFolder::updateOrCreate(
            ['slug' => 'marketing-assets'],
            ['name' => 'Marketing Assets', 'disk' => 'public', 'parent_id' => $root->id]
        );

        $product = MediaFolder::updateOrCreate(
            ['slug' => 'product-photos'],
            ['name' => 'Product Photos', 'disk' => 'public', 'parent_id' => $root->id]
        );

        $files = [
            [
                'folder_id' => $marketing->id,
                'filename' => 'supply-chain-collaboration.jpg',
                'path' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
                'mime_type' => 'image/jpeg',
                'size' => 350000,
            ],
            [
                'folder_id' => $marketing->id,
                'filename' => 'factory-automation.jpg',
                'path' => 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80',
                'mime_type' => 'image/jpeg',
                'size' => 290000,
            ],
            [
                'folder_id' => $product->id,
                'filename' => 'logistics-network.jpg',
                'path' => 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=1600&q=80',
                'mime_type' => 'image/jpeg',
                'size' => 310000,
            ],
        ];

        foreach ($files as $file) {
            MediaFile::updateOrCreate(
                ['path' => $file['path']],
                $file,
            );
        }
    }
}
