<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Migration Law', 'slug' => 'migration-law'],
            ['name' => 'Family Law', 'slug' => 'family-law'],
            ['name' => 'Criminal Law', 'slug' => 'criminal-law'],
            ['name' => 'Commercial Litigation', 'slug' => 'commercial-litigation'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
