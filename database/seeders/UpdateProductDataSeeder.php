<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class UpdateProductDataSeeder extends Seeder
{
    public function run(): void
    {
        // Get all categories
        $original = Category::where('slug', 'original')->first();
        $choconut = Category::where('slug', 'choconut')->first();
        $bitterKola = Category::where('slug', 'bitter-kola')->first();
        $ginger = Category::where('slug', 'ginger')->first();
        $lemonGrass = Category::where('slug', 'lemon-grass')->first();
        $citrusLimon = Category::where('slug', 'citrus-limon-clove')->first();

        // Update existing products or create new ones
        // Don't delete - just update or create

        // Original products
        if ($original) {
            Product::updateOrCreate(
                ['slug' => 'original-tigernut-drink-500ml'],
                [
                    'name' => 'Original Tigernut Drink (500ml)',
                    'category_id' => $original->id,
                    'description' => 'Our classic tigernut drink - smooth, creamy, and naturally sweet. Made from 100% organic tigernuts with no additives.',
                    'price' => 20.00,
                    'compare_price' => 25.00,
                    'stock' => 100,
                    'weight' => '500ml',
                    'sku' => 'ORG-500',
                    'image' => 'products/footer/original.jpeg',
                    'is_active' => true,
                    'is_featured' => true,
                ]
            );

            Product::updateOrCreate(
                ['slug' => 'original-tigernut-drink-1l'],
                [
                    'name' => 'Original Tigernut Drink (1L)',
                    'category_id' => $original->id,
                    'description' => 'Family size! Our best-selling tigernut drink in a larger bottle. Perfect for sharing.',
                    'price' => 35.00,
                    'compare_price' => 40.00,
                    'stock' => 80,
                    'weight' => '1L',
                    'sku' => 'ORG-1L',
                    'image' => 'products/footer/original.jpeg',
                    'is_active' => true,
                    'is_featured' => true,
                ]
            );
        }

        // Choconut products
        if ($choconut) {
            Product::create([
                'name' => 'ChocoNuts Drink (500ml)',
                'slug' => 'choconuts-drink-500ml',
                'category_id' => $choconut->id,
                'description' => 'Rich chocolate-flavored tigernut drink. A delicious treat that\'s both healthy and indulgent!',
                'price' => 22.00,
                'compare_price' => 27.00,
                'stock' => 90,
                'weight' => '500ml',
                'sku' => 'CHOCO-500',
                'image' => 'products/footer/choconut.jpg',
                'is_active' => true,
                'is_featured' => true,
            ]);

            Product::create([
                'name' => 'ChocoNuts Drink (1L)',
                'slug' => 'choconuts-drink-1l',
                'category_id' => $choconut->id,
                'description' => 'Family-size chocolate tigernut drink. Perfect for chocolate lovers!',
                'price' => 38.00,
                'compare_price' => 45.00,
                'stock' => 70,
                'weight' => '1L',
                'sku' => 'CHOCO-1L',
                'image' => 'products/footer/choconut.jpg',
                'is_active' => true,
                'is_featured' => true,
            ]);
        }

        // Bitter Kola products
        if ($bitterKola) {
            Product::create([
                'name' => 'Bitter Kola Tigernut Drink (500ml)',
                'slug' => 'bitter-kola-tigernut-drink-500ml',
                'category_id' => $bitterKola->id,
                'description' => 'Traditional blend of tigernut and bitter kola. Known for its health benefits and unique taste.',
                'price' => 25.00,
                'compare_price' => 30.00,
                'stock' => 60,
                'weight' => '500ml',
                'sku' => 'BKOLA-500',
                'image' => 'products/footer/bitter-kola.jpeg',
                'is_active' => true,
                'is_featured' => true,
            ]);
        }

        // Ginger products
        if ($ginger) {
            Product::create([
                'name' => 'Ginger Tigernut Drink (500ml)',
                'slug' => 'ginger-tigernut-drink-500ml',
                'category_id' => $ginger->id,
                'description' => 'Spicy and refreshing! Our tigernut drink infused with natural ginger for that extra kick.',
                'price' => 22.00,
                'compare_price' => 27.00,
                'stock' => 85,
                'weight' => '500ml',
                'sku' => 'GING-500',
                'image' => 'products/footer/ginger.jpg',
                'is_active' => true,
                'is_featured' => true,
            ]);

            Product::create([
                'name' => 'Ginger Tigernut Drink (1L)',
                'slug' => 'ginger-tigernut-drink-1l',
                'category_id' => $ginger->id,
                'description' => 'Family-size ginger tigernut drink. Great for digestion and immunity!',
                'price' => 38.00,
                'compare_price' => 43.00,
                'stock' => 65,
                'weight' => '1L',
                'sku' => 'GING-1L',
                'image' => 'products/footer/ginger.jpg',
                'is_active' => true,
                'is_featured' => false,
            ]);
        }

        // Lemon Grass products
        if ($lemonGrass) {
            Product::create([
                'name' => 'Lemongrass Tigernut Drink (500ml)',
                'slug' => 'lemongrass-tigernut-drink-500ml',
                'category_id' => $lemonGrass->id,
                'description' => 'Fresh and citrusy! Tigernut drink with lemongrass for a refreshing tropical taste.',
                'price' => 22.00,
                'compare_price' => 27.00,
                'stock' => 75,
                'weight' => '500ml',
                'sku' => 'LEMON-500',
                'image' => 'products/footer/lemon-grass.jpg',
                'is_active' => true,
                'is_featured' => false,
            ]);
        }

        // Citrus Limon & Clove products
        if ($citrusLimon) {
            Product::create([
                'name' => 'Citrus Limon & Clove Drink (500ml)',
                'slug' => 'citrus-limon-clove-drink-500ml',
                'category_id' => $citrusLimon->id,
                'description' => 'A unique blend of tigernut with citrus and aromatic clove. Refreshing with a warm finish.',
                'price' => 24.00,
                'compare_price' => 29.00,
                'stock' => 70,
                'weight' => '500ml',
                'sku' => 'CITRUS-500',
                'image' => 'products/footer/clove.jpg',
                'is_active' => true,
                'is_featured' => false,
            ]);
        }

        $this->command->info('Products updated successfully with proper prices and stock!');
    }
}

