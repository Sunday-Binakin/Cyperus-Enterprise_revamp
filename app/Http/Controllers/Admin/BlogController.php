<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with(['author', 'comments'])->withCount('comments');

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $blogs = $query->latest()->paginate(15);

        return Inertia::render('admin/blogs', [
            'blogs' => $blogs,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? 'all',
            ],
            'stats' => [
                'total' => Blog::count(),
                'published' => Blog::published()->count(),
                'drafts' => Blog::draft()->count(),
                'featured' => Blog::featured()->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blog-form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
        ]);

        // Handle image upload
        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $imageName = time() . '_' . Str::slug($validated['title']) . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('blog-images', $imageName, 'public');
            $validated['featured_image'] = '/storage/' . $imagePath;
        }

        // Set published_at if publishing
        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post created successfully!');
    }

    public function show(Blog $blog)
    {
        $blog->load(['author', 'comments' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('admin/blog-detail', [
            'blog' => $blog,
        ]);
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('admin/blog-form', [
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'featured' => 'boolean',
            'tags' => 'nullable|array',
        ]);

        // Handle image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($blog->featured_image) {
                $oldPath = str_replace('/storage/', '', $blog->featured_image);
                Storage::disk('public')->delete($oldPath);
            }

            $image = $request->file('featured_image');
            $imageName = time() . '_' . Str::slug($validated['title']) . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('blog-images', $imageName, 'public');
            $validated['featured_image'] = '/storage/' . $imagePath;
        }

        // Set published_at if changing to published
        if ($validated['status'] === 'published' && $blog->status === 'draft' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post updated successfully!');
    }

    public function destroy(Blog $blog)
    {
        // Delete image if exists
        if ($blog->featured_image) {
            $imagePath = str_replace('/storage/', '', $blog->featured_image);
            Storage::disk('public')->delete($imagePath);
        }

        $blog->delete();

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post deleted successfully!');
    }

    public function approveComment(BlogComment $comment)
    {
        $comment->approve();

        return back()->with('success', 'Comment approved successfully!');
    }

    public function rejectComment(BlogComment $comment)
    {
        $comment->reject();

        return back()->with('success', 'Comment rejected successfully!');
    }
}
