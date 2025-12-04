<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::active();

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by difficulty
        if ($request->filled('difficulty') && $request->difficulty !== 'all') {
            $query->where('difficulty', $request->difficulty);
        }

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        $recipes = $query->latest()->get();

        return Inertia::render('recipes', [
            'recipes' => $recipes,
            'filters' => [
                'category' => $request->category ?? 'all',
                'difficulty' => $request->difficulty ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    public function show(Request $request, Recipe $recipe)
    {
        // Increment views only once per session
        $sessionKey = 'recipe_viewed_'.$recipe->id;
        if (! $request->session()->has($sessionKey)) {
            $recipe->incrementViews();
            $request->session()->put($sessionKey, true);
        }

        return Inertia::render('recipe-detail', [
            'recipe' => $recipe,
        ]);
    }
}
