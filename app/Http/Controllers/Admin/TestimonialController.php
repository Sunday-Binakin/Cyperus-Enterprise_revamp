<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Testimonial::with(['creator', 'updater'])
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->whereNull('deleted_at')->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->whereNull('deleted_at')->where('is_active', false);
            } elseif ($request->status === 'deleted') {
                $query->withTrashed()->whereNotNull('deleted_at');
            }
        }

        $testimonials = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/testimonials', [
            'testimonials' => $testimonials,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/create-testimonial', [
            'testimonial' => null,
        ]);
    }

    public function store(StoreTestimonialRequest $request)
    {
        $validated = $request->validated();

        $validated['created_by'] = Auth::id();

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $this->handleImageUpload($request->file('image'));
        }

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    public function show(Testimonial $testimonial): Response
    {
        $testimonial->load(['creator', 'updater']);
        
        return Inertia::render('admin/show-testimonial', [
            'testimonial' => $testimonial,
        ]);
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/edit-testimonial', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $validated = $request->validated();

        $validated['updated_by'] = Auth::id();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $validated['image'] = $this->handleImageUpload($request->file('image'));
        }

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }

    public function restore($id)
    {
        $testimonial = Testimonial::withTrashed()->findOrFail($id);
        $testimonial->restore();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial restored successfully.');
    }

    public function forceDelete($id)
    {
        $testimonial = Testimonial::withTrashed()->findOrFail($id);
        
        // Delete image file
        if ($testimonial->image) {
            Storage::disk('public')->delete($testimonial->image);
        }
        
        $testimonial->forceDelete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial permanently deleted.');
    }

    public function toggleStatus(Testimonial $testimonial)
    {
        $testimonial->update([
            'is_active' => !$testimonial->is_active,
            'updated_by' => Auth::id(),
        ]);

        $status = $testimonial->is_active ? 'activated' : 'deactivated';

        return redirect()->back()
            ->with('success', "Testimonial {$status} successfully.");
    }

    private function handleImageUpload($file): string
    {
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('uploads/testimonials', $filename, 'public');
        return $path;
    }
}
