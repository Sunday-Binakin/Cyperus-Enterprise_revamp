<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class FixProductData extends Command
{
    protected $signature = 'products:fix';
    protected $description = 'Fix product images and prices';

    public function handle()
    {
        $products = Product::all();

        foreach ($products as $product) {
            // Fix prices (divide by 1000 if they're too large)
            if ($product->price > 1000) {
                $product->price = $product->price / 1000;
            }
            if ($product->compare_price > 1000) {
                $product->compare_price = $product->compare_price / 1000;
            }

            // Fix image paths
            if ($product->image) {
                $filename = basename($product->image);
                
                // Map to correct images
                if (str_contains($product->slug, 'original')) {
                    $product->image = 'products/footer/original.jpeg';
                } elseif (str_contains($product->slug, 'choconut')) {
                    $product->image = 'products/footer/choconut.jpg';
                } elseif (str_contains($product->slug, 'bitter-kola')) {
                    $product->image = 'products/footer/bitter-kola.jpeg';
                } elseif (str_contains($product->slug, 'ginger')) {
                    $product->image = 'products/footer/ginger.jpg';
                } elseif (str_contains($product->slug, 'lemon')) {
                    $product->image = 'products/footer/lemon-grass.jpg';
                } elseif (str_contains($product->slug, 'citrus') || str_contains($product->slug, 'clove')) {
                    $product->image = 'products/footer/clove.jpg';
                }
            }

            $product->save();
            $this->info("Fixed: {$product->name} - Price: {$product->price} - Image: {$product->image}");
        }

        $this->info('All products updated successfully!');
    }
}

