<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaystackService
{
    protected string $secretKey;
    protected string $publicKey;
    protected string $baseUrl = 'https://api.paystack.co';

    public function __construct()
    {
        $this->secretKey = config('services.paystack.secret_key');
        $this->publicKey = config('services.paystack.public_key');
    }

    /**
     * Initialize a payment
     */
    public function initializePayment(array $data)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->secretKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/transaction/initialize', [
                'email' => $data['email'],
                'amount' => $data['amount'] * 100, // Convert to kobo/pesewas
                'currency' => $data['currency'] ?? 'GHS',
                'reference' => $data['reference'] ?? $this->generateReference(),
                'callback_url' => $data['callback_url'] ?? route('payment.callback'),
                'metadata' => $data['metadata'] ?? [],
                'channels' => ['card', 'bank', 'mobile_money', 'ussd', 'qr'], // Enable all payment channels
            ]);

            if ($response->successful() && $response->json('status')) {
                return [
                    'status' => true,
                    'message' => 'Payment initialized successfully',
                    'data' => $response->json('data'),
                ];
            }

            return [
                'status' => false,
                'message' => $response->json('message') ?? 'Payment initialization failed',
            ];
        } catch (Exception $e) {
            Log::error('Paystack initialization error: ' . $e->getMessage());
            return [
                'status' => false,
                'message' => 'An error occurred while initializing payment',
            ];
        }
    }

    /**
     * Verify a payment
     */
    public function verifyPayment(string $reference)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->secretKey,
            ])->get($this->baseUrl . '/transaction/verify/' . $reference);

            if ($response->successful() && $response->json('status')) {
                return [
                    'status' => true,
                    'message' => 'Payment verified successfully',
                    'data' => $response->json('data'),
                ];
            }

            return [
                'status' => false,
                'message' => $response->json('message') ?? 'Payment verification failed',
            ];
        } catch (Exception $e) {
            Log::error('Paystack verification error: ' . $e->getMessage());
            return [
                'status' => false,
                'message' => 'An error occurred while verifying payment',
            ];
        }
    }

    /**
     * Verify webhook signature
     */
    public function verifyWebhookSignature(string $signature, string $payload): bool
    {
        $computedSignature = hash_hmac('sha512', $payload, $this->secretKey);
        return hash_equals($signature, $computedSignature);
    }

    /**
     * Generate a unique payment reference
     */
    public function generateReference(): string
    {
        return 'CYPR-' . time() . '-' . strtoupper(substr(md5(uniqid()), 0, 10));
    }

    /**
     * Get public key
     */
    public function getPublicKey(): string
    {
        return $this->publicKey;
    }
}

