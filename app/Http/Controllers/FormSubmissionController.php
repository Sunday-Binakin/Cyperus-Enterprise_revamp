<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use App\Models\Notification;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:contact,enquiry,quote',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $submission = FormSubmission::create(array_merge($validated, [
            'status' => 'unread',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]));

        // Create notification for admin
        Notification::createNotification(
            'form_submission',
            'New ' . ucfirst($submission->type) . ' Form',
            'New ' . $submission->type . ' from ' . $submission->name . ': ' . $submission->email,
            route('admin.form-submissions.index'),
            [
                'submission_id' => $submission->id,
                'type' => $submission->type,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Thank you! We\'ll get back to you soon.',
        ]);
    }
}
