<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /**
     * Store a new contact message
     */
    public function store(Request $request)
    {
        // Determine message type based on the fields present
        $messageType = $this->determineMessageType($request);
        
        // Get validation rules based on message type
        $validationRules = $this->getValidationRules($messageType);
        $validated = $request->validate($validationRules);

        // Process the data based on message type
        $messageData = $this->processMessageData($validated, $messageType);

        // Create message
        $message = Message::create($messageData);

        // Create notification for admin
        Notification::createNotification(
            'message',
            $this->getNotificationTitle($messageType),
            $this->getNotificationBody($messageData, $messageType),
            route('admin.messages.show', $message->id),
            [
                'message_id' => $message->id,
                'sender_name' => $messageData['name'],
                'sender_email' => $messageData['email'],
                'message_type' => $messageType,
            ]
        );

        return back()->with('success', $this->getSuccessMessage($messageType));
    }

    /**
     * Determine the message type based on request data
     */
    private function determineMessageType(Request $request): string
    {
        // Check for export-specific fields first (more specific)
        if ($request->has('contactPerson') || $request->has('productsInterested') || $request->has('orderQuantity')) {
            return 'export';
        }
        
        // Check for distributor-specific fields
        if ($request->has('fullName') || $request->has('interestedProducts') || $request->has('businessYears')) {
            return 'distributor';
        }
        
        // Default to contact
        return 'contact';
    }

    /**
     * Get validation rules based on message type
     */
    private function getValidationRules(string $messageType): array
    {
        $baseRules = [
            'email' => 'required|email|max:255',
        ];

        switch ($messageType) {
            case 'distributor':
                return array_merge($baseRules, [
                    'fullName' => 'required|string|max:255',
                    'companyName' => 'required|string|max:255',
                    'countryCity' => 'required|string|max:255',
                    'phone' => 'required|string|max:20',
                    'businessType' => 'required|string|max:100',
                    'businessYears' => 'required|string|max:100',
                    'currentlyDistributing' => 'required|string|in:yes,no',
                    'currentBrands' => 'nullable|string|max:1000',
                    'interestedProducts' => 'required|array|min:1',
                    'monthlyQuantity' => 'nullable|string|max:255',
                    'packagingPreference' => 'required|string|max:100',
                    'importExperience' => 'required|string|in:yes,no',
                    'shippingMethod' => 'nullable|string|max:255',
                ]);
            
            case 'export':
                return array_merge($baseRules, [
                    'companyName' => 'required|string|max:255',
                    'contactPerson' => 'required|string|max:255',
                    'phone' => 'required|string|max:20',
                    'country' => 'required|string|max:100',
                    'businessType' => 'required|string|max:100',
                    'productsInterested' => 'required|array|min:1',
                    'orderQuantity' => 'nullable|string|max:255',
                    'additionalInfo' => 'nullable|string|max:2000',
                ]);
            
            default: // contact
                return array_merge($baseRules, [
                    'name' => 'required|string|max:255',
                    'phone' => 'nullable|string|max:20',
                    'company' => 'nullable|string|max:255',
                    'subject' => 'required|string|max:255',
                    'message' => 'required|string|max:5000',
                ]);
        }
    }

    /**
     * Process message data based on type
     */
    private function processMessageData(array $validated, string $messageType): array
    {
        $baseData = [
            'type' => $messageType,
            'email' => $validated['email'],
            'status' => 'unread',
        ];

        switch ($messageType) {
            case 'distributor':
                return array_merge($baseData, [
                    'name' => $validated['fullName'],
                    'phone' => $validated['phone'],
                    'company' => $validated['companyName'],
                    'country' => $validated['countryCity'],
                    'business_type' => $validated['businessType'],
                    'subject' => 'International Distributor Inquiry',
                    'message' => $this->buildDistributorMessage($validated),
                    'additional_data' => [
                        'business_years' => $validated['businessYears'],
                        'currently_distributing' => $validated['currentlyDistributing'],
                        'current_brands' => $validated['currentBrands'] ?? null,
                        'interested_products' => $validated['interestedProducts'],
                        'monthly_quantity' => $validated['monthlyQuantity'] ?? null,
                        'packaging_preference' => $validated['packagingPreference'],
                        'import_experience' => $validated['importExperience'],
                        'shipping_method' => $validated['shippingMethod'] ?? null,
                    ]
                ]);
            
            case 'export':
                return array_merge($baseData, [
                    'name' => $validated['contactPerson'],
                    'phone' => $validated['phone'],
                    'company' => $validated['companyName'],
                    'country' => $validated['country'],
                    'business_type' => $validated['businessType'],
                    'subject' => 'Export Department Inquiry',
                    'message' => $this->buildExportMessage($validated),
                    'additional_data' => [
                        'products_interested' => $validated['productsInterested'],
                        'order_quantity' => $validated['orderQuantity'] ?? null,
                        'additional_info' => $validated['additionalInfo'] ?? null,
                    ]
                ]);
            
            default: // contact
                return array_merge($baseData, [
                    'name' => $validated['name'],
                    'phone' => $validated['phone'] ?? null,
                    'company' => $validated['company'] ?? null,
                    'subject' => $validated['subject'],
                    'message' => $validated['message'],
                ]);
        }
    }

    /**
     * Build distributor message from form data
     */
    private function buildDistributorMessage(array $data): string
    {
        $message = "International Distributor Inquiry\n\n";
        $message .= "Business Details:\n";
        $message .= "• Business Type: {$data['businessType']}\n";
        $message .= "• Years in Business: {$data['businessYears']}\n";
        $message .= "• Currently Distributing: {$data['currentlyDistributing']}\n";
        
        if (!empty($data['currentBrands'])) {
            $message .= "• Current Brands: {$data['currentBrands']}\n";
        }
        
        $message .= "\nProduct Interest:\n";
        $message .= "• Interested Products: " . implode(', ', $data['interestedProducts']) . "\n";
        
        if (!empty($data['monthlyQuantity'])) {
            $message .= "• Estimated Monthly Quantity: {$data['monthlyQuantity']}\n";
        }
        
        $message .= "• Packaging Preference: {$data['packagingPreference']}\n";
        $message .= "• Import Experience: {$data['importExperience']}\n";
        
        if (!empty($data['shippingMethod'])) {
            $message .= "• Preferred Shipping Method: {$data['shippingMethod']}\n";
        }
        
        return $message;
    }

    /**
     * Build export message from form data
     */
    private function buildExportMessage(array $data): string
    {
        $message = "Export Department Inquiry\n\n";
        $message .= "Business Details:\n";
        $message .= "• Business Type: {$data['businessType']}\n";
        $message .= "• Products Interested: " . implode(', ', $data['productsInterested']) . "\n";
        
        if (!empty($data['orderQuantity'])) {
            $message .= "• Order Quantity: {$data['orderQuantity']}\n";
        }
        
        if (!empty($data['additionalInfo'])) {
            $message .= "\nAdditional Information:\n{$data['additionalInfo']}\n";
        }
        
        return $message;
    }

    /**
     * Get notification title based on message type
     */
    private function getNotificationTitle(string $messageType): string
    {
        switch ($messageType) {
            case 'distributor':
                return 'New Distributor Inquiry';
            case 'export':
                return 'New Export Inquiry';
            default:
                return 'New Contact Message';
        }
    }

    /**
     * Get notification body based on message data and type
     */
    private function getNotificationBody(array $data, string $messageType): string
    {
        $from = $data['name'];
        $company = !empty($data['company']) ? " from {$data['company']}" : '';
        
        switch ($messageType) {
            case 'distributor':
                return "New distributor inquiry from {$from}{$company} - International Distribution Request";
            case 'export':
                return "New export inquiry from {$from}{$company} - Export Department Request";
            default:
                return "New message from {$from}{$company} - {$data['subject']}";
        }
    }

    /**
     * Get success message based on message type
     */
    private function getSuccessMessage(string $messageType): string
    {
        switch ($messageType) {
            case 'distributor':
                return 'Thank you for your distributor inquiry! We will review your application and get back to you within 48 hours.';
            case 'export':
                return 'Thank you for your export inquiry! Our export team will contact you soon.';
            default:
                return 'Thank you for contacting us! We will get back to you soon.';
        }
    }
}
