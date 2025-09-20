<?php

namespace Database\Seeders;

use App\Models\Keyword;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KeywordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $keywords = [
            'solar panel',
            'battery storage',
            'smart home',
            'industrial automation',
            'cnc machining',
            'custom packaging',
            'private label skincare',
            'organic fertilizer',
            'cold chain logistics',
            'iot device',
            'wearable tech',
            'sustainable textile',
            'led lighting',
            'medical device',
            '3d printing',
            'eco friendly material',
            'electric vehicle part',
            'pet food',
            'modular housing',
            'heavy machinery rental',
        ];

        foreach ($keywords as $keyword) {
            Keyword::updateOrCreate(
                ['slug' => Str::slug($keyword)],
                ['name' => Str::title($keyword)],
            );
        }
    }
}
