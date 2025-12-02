<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@cyperus.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Test Customer
        User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Test Customer',
                'password' => bcrypt('password'),
                'role' => 'customer',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Categories
        $categories = [
            ['name' => 'Original', 'description' => 'Original tigernut products', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Choconut', 'description' => 'Chocolate flavored tigernut', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Ginger', 'description' => 'Ginger flavored tigernut', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Citrus Limon Clove', 'description' => 'Citrus lemon with clove', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'Lemon Grass', 'description' => 'Lemon grass flavored', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Bitter Kola', 'description' => 'Bitter kola flavored', 'is_active' => true, 'sort_order' => 6],
        ];

        foreach ($categories as $categoryData) {
            $category = \App\Models\Category::firstOrCreate(
                ['name' => $categoryData['name']],
                array_merge($categoryData, ['created_by' => $admin->id])
            );

            // Create sample products for each category
            \App\Models\Product::firstOrCreate(
                ['name' => $categoryData['name'] . ' Tigernut (500g)'],
                [
                    'category_id' => $category->id,
                    'description' => 'Premium quality ' . strtolower($categoryData['name']) . ' tigernut drink mix.',
                    'features' => 'Rich in nutrients, High in fiber, Natural ingredients',
                    'price' => rand(15000, 20000),
                    'compare_price' => rand(20000, 25000),
                    'stock' => rand(50, 200),
                    'weight' => '500g',
                    'is_featured' => rand(0, 1),
                    'is_active' => true,
                    'created_by' => $admin->id,
                ]
            );

            \App\Models\Product::firstOrCreate(
                ['name' => $categoryData['name'] . ' Tigernut (250g)'],
                [
                    'category_id' => $category->id,
                    'description' => 'Premium quality ' . strtolower($categoryData['name']) . ' tigernut drink mix.',
                    'features' => 'Rich in nutrients, High in fiber, Natural ingredients',
                    'price' => rand(8000, 12000),
                    'compare_price' => rand(12000, 15000),
                    'stock' => rand(50, 200),
                    'weight' => '250g',
                    'is_featured' => false,
                    'is_active' => true,
                    'created_by' => $admin->id,
                ]
            );
        }

        $this->command->info('✅ Database seeded successfully!');
        $this->command->info('📧 Admin Login: admin@cyperus.com');
        $this->command->info('🔑 Password: password');
    }
}
