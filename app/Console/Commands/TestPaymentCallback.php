<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use App\Services\PaystackService;
use Illuminate\Console\Command;

class TestPaymentCallback extends Command
{
    protected $signature = 'payment:test-callback {reference}';
    protected $description = 'Test payment callback for a transaction';

    public function handle(PaystackService $paystack)
    {
        $reference = $this->argument('reference');
        
        $this->info("Testing payment verification for reference: {$reference}");
        
        // Test Paystack verification
        $verification = $paystack->verifyPayment($reference);
        
        $this->info("Paystack verification result:");
        $this->line(json_encode($verification, JSON_PRETTY_PRINT));
        
        if ($verification['status']) {
            $this->info("✅ Payment verification successful!");
            
            // Check if transaction exists
            $transaction = Transaction::where('reference', $reference)->first();
            if ($transaction) {
                $this->info("✅ Transaction found in database");
                $this->info("Current status: {$transaction->status}");
                
                // Simulate callback processing
                if ($verification['data']['status'] === 'success') {
                    $transaction->update([
                        'status' => 'success',
                        'transaction_id' => $verification['data']['id'],
                        'paid_at' => now(),
                        'gateway_response' => $verification['data']
                    ]);
                    
                    $this->info("✅ Transaction status updated to success!");
                } else {
                    $this->error("❌ Payment not successful on Paystack");
                }
            } else {
                $this->error("❌ Transaction not found in database");
            }
        } else {
            $this->error("❌ Payment verification failed: " . $verification['message']);
        }
    }
}