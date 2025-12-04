<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::query();

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by difficulty
        if ($request->filled('difficulty') && $request->difficulty !== 'all') {
            $query->where('difficulty', $request->difficulty);
        }

        $recipes = $query->latest()->paginate(15);

        return Inertia::render('admin/recipes', [
            'recipes' => $recipes,
            'filters' => [
                'search' => $request->search ?? '',
                'category' => $request->category ?? 'all',
                'difficulty' => $request->difficulty ?? 'all',
            ],
            'stats' => [
                'total' => Recipe::count(),
                'active' => Recipe::active()->count(),
                'featured' => Recipe::featured()->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/recipe-form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required|string',
            'prep_time' => 'required|string',
            'cook_time' => 'nullable|string',
            'servings' => 'required|integer|min:1',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'ingredients' => 'required|array',
            'ingredients.*' => 'required|string',
            'instructions' => 'required|array',
            'instructions.*' => 'required|string',
            'tips' => 'nullable|array',
            'tips.*' => 'nullable|string',
            'nutrition' => 'nullable|array',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('recipes', $imageName, 'public');
            $validated['image'] = '/storage/'.$imagePath;
        }

        Recipe::create($validated);

        return redirect()->route('admin.recipes.index')
            ->with('success', 'Recipe created successfully!');
    }

    public function edit(Recipe $recipe)
    {
        return Inertia::render('admin/recipe-form', [
            'recipe' => $recipe,
        ]);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required|string',
            'prep_time' => 'required|string',
            'cook_time' => 'nullable|string',
            'servings' => 'required|integer|min:1',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'ingredients' => 'required|array',
            'ingredients.*' => 'required|string',
            'instructions' => 'required|array',
            'instructions.*' => 'required|string',
            'tips' => 'nullable|array',
            'tips.*' => 'nullable|string',
            'nutrition' => 'nullable|array',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($recipe->image) {
                $oldPath = str_replace('/storage/', '', $recipe->image);
                Storage::disk('public')->delete($oldPath);
            }

            $image = $request->file('image');
            $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('recipes', $imageName, 'public');
            $validated['image'] = '/storage/'.$imagePath;
        }

        $recipe->update($validated);

        return redirect()->route('admin.recipes.index')
            ->with('success', 'Recipe updated successfully!');
    }

    public function destroy(Recipe $recipe)
    {
        // Delete image if exists
        if ($recipe->image) {
            $imagePath = str_replace('/storage/', '', $recipe->image);
            Storage::disk('public')->delete($imagePath);
        }

        $recipe->delete();

        return redirect()->route('admin.recipes.index')
            ->with('success', 'Recipe deleted successfully!');
    }
}
