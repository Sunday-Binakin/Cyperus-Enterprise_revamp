<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('products')
            ->with(['creator', 'updater']);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->orderBy('sort_order')->paginate(20);

        return Inertia::render('admin/categories', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/category-form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        $category = Category::create($validated);

        // Log activity
        ActivityLog::logActivity(
            'created',
            $category,
            auth()->user()->name . ' created category: ' . $category->name
        );

        // Create notification
        Notification::createNotification(
            'category',
            'New Category Added',
            'Category "' . $category->name . '" has been created.',
            route('admin.categories.show', $category->id)
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category created successfully!');
    }

    public function show(Category $category)
    {
        $category->load(['products' => function ($query) {
            $query->latest()->take(10);
        }, 'creator', 'updater']);

        return Inertia::render('Admin/CategoryDetail', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('admin/category-form', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        $oldValues = $category->toArray();

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($validated);

        // Log activity
        ActivityLog::logActivity(
            'updated',
            $category,
            auth()->user()->name . ' updated category: ' . $category->name,
            $oldValues,
            $category->toArray()
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        // Soft delete instead of actual deletion
        $category->update(['is_active' => false]);
        $category->delete();

        // Log activity
        ActivityLog::logActivity(
            'disabled',
            $category,
            auth()->user()->name . ' disabled category: ' . $category->name
        );

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category disabled successfully!');
    }

    public function toggleStatus(Category $category)
    {
        $category->update(['is_active' => !$category->is_active]);

        $action = $category->is_active ? 'enabled' : 'disabled';

        ActivityLog::logActivity(
            $action,
            $category,
            auth()->user()->name . ' ' . $action . ' category: ' . $category->name
        );

        return back()->with('success', 'Category status updated successfully!');
    }
}
