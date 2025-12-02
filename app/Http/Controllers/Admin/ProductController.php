<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'creator', 'updater']);

        // Search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category !== 'All') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'All') {
            if ($request->status === 'Active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'Low Stock') {
                $query->where('stock', '>', 0)->where('stock', '<=', 10);
            } elseif ($request->status === 'Out of Stock') {
                $query->where('stock', 0);
            }
        }

        $products = $query->latest()->paginate(20);

        // Transform product images to use asset helper
        $products->getCollection()->transform(function ($product) {
            $product->image = $product->image ? asset($product->image) : null;
            return $product;
        });

        $categories = Category::where('is_active', true)->pluck('name');

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function create()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('admin/products/form', [
            'categories' => $categories,
            'product' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'weight' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
            
            // Also copy to public/storage for immediate access (Windows symlink workaround)
            $sourcePath = storage_path('app/public/' . $path);
            $destPath = public_path('storage/' . $path);
            $destDir = dirname($destPath);
            
            if (!file_exists($destDir)) {
                mkdir($destDir, 0755, true);
            }
            
            if (file_exists($sourcePath)) {
                copy($sourcePath, $destPath);
            }
        }

        $product = Product::create($validated);

        // Log activity
        ActivityLog::logActivity(
            'created',
            $product,
            auth()->user()->name . ' created product: ' . $product->name
        );

        // Create notification
        Notification::createNotification(
            'product',
            'New Product Added',
            'Product "' . $product->name . '" has been created.',
            route('admin.products.show', $product->id)
        );

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        $product->load(['category', 'creator', 'updater']);

        return Inertia::render('Admin/ProductDetail', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        $categories = Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        // Transform product image to full URL
        $productData = $product->toArray();
        $productData['image'] = $product->image ? asset($product->image) : null;

        return Inertia::render('admin/products/form', [
            'product' => $productData,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'weight' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        $oldValues = $product->toArray();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image from public/uploads/products
            if ($product->image) {
                $oldImagePath = public_path($product->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
            
            // Store image directly in public/uploads/products
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(public_path('uploads/products'), $imageName);
            $validated['image'] = 'uploads/products/' . $imageName;
        }

        $product->update($validated);

        // Log activity
        ActivityLog::logActivity(
            'updated',
            $product,
            auth()->user()->name . ' updated product: ' . $product->name,
            $oldValues,
            $product->toArray()
        );

        // Check for low stock and create notification
        if ($product->isLowStock()) {
            Notification::createNotification(
                'low_stock',
                'Low Stock Alert',
                'Product "' . $product->name . '" has low stock (' . $product->stock . ' units left).',
                route('admin.products.edit', $product->id)
            );
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        // Soft delete instead of actual deletion
        $product->update(['is_active' => false]);
        $product->delete();

        // Log activity
        ActivityLog::logActivity(
            'disabled',
            $product,
            auth()->user()->name . ' disabled product: ' . $product->name
        );

        return redirect()->route('admin.products.index')
            ->with('success', 'Product disabled successfully!');
    }

    /**
     * Toggle product active status
     */
    public function toggleStatus(Product $product)
    {
        $product->update(['is_active' => !$product->is_active]);

        $action = $product->is_active ? 'enabled' : 'disabled';

        // Log activity
        ActivityLog::logActivity(
            $action,
            $product,
            auth()->user()->name . ' ' . $action . ' product: ' . $product->name
        );

        return back()->with('success', 'Product status updated successfully!');
    }
}
