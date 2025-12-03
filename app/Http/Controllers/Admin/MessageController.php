<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of messages
     */
    public function index(Request $request)
    {
        // Build query
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
            $message->markAsRead(Auth::id());
        }

        // Load the reader relationship
        $message->load('reader');

        return Inertia::render('admin/show-message', [
            'message' => $message,
        ]);
    }

    /**
     * Mark message as read and reduce notification count
     */
    public function markAsRead(Message $message)
    {
        // Mark message as read if unread
        if ($message->status === 'unread') {
            $message->markAsRead(Auth::id());
        }

        // Mark related notifications as read
        $notifications = \App\Models\Notification::where('type', 'message')
            ->where('data->message_id', $message->id)
            ->where('is_read', false)
            ->get();

        foreach ($notifications as $notification) {
            $notification->markAsRead();
        }

        return redirect()->route('admin.messages.index')
            ->with('success', 'Message marked as read successfully!');
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
            'read_by' => $validated['status'] === 'read' ? Auth::id() : $message->read_by,
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
