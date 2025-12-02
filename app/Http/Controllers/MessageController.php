<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Notification;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Store a new contact message
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // Create message
        $message = Message::create([
            'type' => 'contact',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'unread',
        ]);

        // Create notification for admin
        Notification::createNotification(
            'message',
            'New Contact Message',
            'New message from ' . $validated['name'] . ' - ' . $validated['subject'],
            route('admin.messages.show', $message->id),
            [
                'message_id' => $message->id,
                'sender_name' => $validated['name'],
                'sender_email' => $validated['email'],
            ]
        );

        return back()->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
