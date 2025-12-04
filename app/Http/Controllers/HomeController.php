<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Get featured products
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(8)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'comparePrice' => $product->compare_price,
                    'image' => $product->image ? asset($product->image) : null,
                    'category' => $product->category->name,
                    'inStock' => !$product->isOutOfStock(),
                    'weight' => $product->weight,
                ];
            });

        // Get active categories with product count
        $categories = Category::withCount(['activeProducts'])
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'image' => $category->image ? asset($category->image) : null,
                    'productCount' => $category->active_products_count,
                ];
            });

        // Get active testimonials
        $testimonials = \App\Models\Testimonial::active()
            ->ordered()
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'title' => $testimonial->title,
                    'company' => $testimonial->company,
                    'content' => $testimonial->content,
                    'image' => $testimonial->image_url ?: '/images/clients/testimonial/default.jpg',
                ];
            });

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'testimonials' => $testimonials,
        ]);
    }

    public function products(Request $request)
    {
        $query = Product::with('category')
            ->active()
            ->inStock();

        // Search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        // Sort
        $sort = $request->get('sort', 'latest');
        match ($sort) {
            'price_low' => $query->orderBy('price', 'asc'),
            'price_high' => $query->orderBy('price', 'desc'),
            'name' => $query->orderBy('name', 'asc'),
            default => $query->latest(),
        };

        $products = $query->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'comparePrice' => $product->compare_price,
                    'image' => $product->image ? asset($product->image) : null,
                    'category' => $product->category->name,
                    'inStock' => !$product->isOutOfStock(),
                    'stock' => $product->stock,
                    'weight' => $product->weight,
                    'description' => $product->description,
                ];
            });

        $categories = Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('product-category', [
            'title' => 'All Products',
            'description' => 'Browse our complete collection of products',
            'products' => $products,
            'categoryPath' => 'products',
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'sort']),
        ]);
    }

    public function productDetail($slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->active()
            ->inStock()
            ->take(4)
            ->get();

        return Inertia::render('product-detail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'features' => $product->features,
                'price' => $product->price,
                'comparePrice' => $product->compare_price,
                'image' => $product->image ? asset('storage/' . $product->image) : null,
                'images' => $product->images,
                'category' => $product->category->name,
                'categorySlug' => $product->category->slug,
                'inStock' => !$product->isOutOfStock(),
                'stock' => $product->stock,
                'weight' => $product->weight,
            ],
            'relatedProducts' => $relatedProducts,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $products = Product::with('category')
            ->where('category_id', $category->id)
            ->active()
            ->inStock()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'comparePrice' => $product->compare_price,
                    'image' => $product->image ? asset($product->image) : null,
                    'category' => $product->category->name,
                    'inStock' => !$product->isOutOfStock(),
                    'stock' => $product->stock,
                    'weight' => $product->weight,
                    'description' => $product->description,
                ];
            });

        return Inertia::render('product-category', [
            'title' => $category->name,
            'description' => $category->description ?? null,
            'products' => $products,
            'categoryPath' => $category->slug,
        ]);
    }
}
