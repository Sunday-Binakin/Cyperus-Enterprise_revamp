<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of messages
     */
    public function index(Request $request)
    {
        $query = Message::query();

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('subject', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%');
            });
        }

        $messages = $query->latest()->paginate(20);

        // Get stats
        $stats = [
            'total' => Message::count(),
            'unread' => Message::where('status', 'unread')->count(),
            'contact' => Message::where('type', 'contact')->count(),
            'distributor' => Message::where('type', 'distributor')->count(),
            'export' => Message::where('type', 'export')->count(),
        ];

        return Inertia::render('admin/messages', [
            'messages' => $messages,
            'stats' => $stats,
            'filters' => $request->only(['type', 'status', 'search']),
        ]);
    }

    /**
     * Display a specific message
     */
    public function show(Message $message)
    {
        // Mark as read if unread
        if ($message->status === 'unread') {
            $message->markAsRead(auth()->id());
        }

        // For now, redirect to messages list until we create the show page
        return redirect()->route('admin.messages.index');
    }

    /**
     * Update message status
     */
    public function updateStatus(Request $request, Message $message)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,replied,archived',
        ]);

        $message->update([
            'status' => $validated['status'],
            'read_at' => $validated['status'] === 'read' ? now() : $message->read_at,
            'read_by' => $validated['status'] === 'read' ? auth()->id() : $message->read_by,
        ]);

        return back()->with('success', 'Message status updated successfully!');
    }

    /**
     * Delete a message
     */
    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully!');
    }
}
