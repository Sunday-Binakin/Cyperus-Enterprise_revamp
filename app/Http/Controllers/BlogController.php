<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::published()->with(['author'])->withCount('approvedComments');

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('content', 'like', '%'.$request->search.'%');
            });
        }

        // Filter by tag
        if ($request->filled('tag')) {
            $query->whereJsonContains('tags', $request->tag);
        }

        $blogs = $query->latest('published_at')->paginate(12);

        // Get featured blogs
        $featuredBlogs = Blog::published()->featured()->take(3)->get();

        return Inertia::render('blog/index', [
            'blogs' => $blogs,
            'featuredBlogs' => $featuredBlogs,
            'filters' => [
                'search' => $request->search ?? '',
                'tag' => $request->tag ?? '',
            ],
        ]);
    }

    public function show(string $slug, Request $request)
    {
        $blog = Blog::published()
            ->where('slug', $slug)
            ->with(['author', 'approvedComments' => function ($query) {
                $query->latest();
            }])
            ->withCount('approvedComments')
            ->firstOrFail();

        // Increment views only once per session
        $sessionKey = 'blog_viewed_'.$blog->id;
        if (! $request->session()->has($sessionKey)) {
            $blog->incrementViews();
            $request->session()->put($sessionKey, true);
        }

        // Get related blogs (same tags or recent)
        $relatedBlogs = Blog::published()
            ->where('id', '!=', $blog->id)
            ->when($blog->tags, function ($query) use ($blog) {
                foreach ($blog->tags as $tag) {
                    $query->orWhereJsonContains('tags', $tag);
                }
            })
            ->take(3)
            ->get();

        return Inertia::render('blog/show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }

    public function storeComment(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_image' => 'nullable|image|mimes:jpeg,png,jpg|max:1024',
            'comment' => 'required|string|max:1000',
        ]);

        // Handle optional image upload for commenter
        if ($request->hasFile('customer_image')) {
            $image = $request->file('customer_image');
            $imageName = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs('comments', $imageName, 'public');
            $validated['customer_image'] = '/storage/'.$imagePath;
        }

        $validated['blog_id'] = $blog->id;
        $validated['status'] = 'approved'; // Auto-approve comments
        $validated['approved_at'] = now();
        // Leave approved_by as null for auto-approved comments (system approval)

        BlogComment::create($validated);

        return back()->with('success', 'Thank you! Your comment has been posted.');
    }
}
