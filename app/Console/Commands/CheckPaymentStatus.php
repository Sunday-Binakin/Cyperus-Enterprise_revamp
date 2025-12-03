<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use App\Services\PaystackService;
use Illuminate\Console\Command;

class CheckPaymentStatus extends Command
{
    protected $signature = 'payment:check {reference?}';
    protected $description = 'Check payment status for a transaction';

    public function handle()
    {
        $reference = $this->argument('reference');
        
        if ($reference) {
            $transaction = Transaction::where('reference', $reference)->first();
            if ($transaction) {
                $this->info("Transaction found:");
                $this->info("Reference: {$transaction->reference}");
                $this->info("Status: {$transaction->status}");
                $this->info("Amount: {$transaction->amount}");
                $this->info("Email: {$transaction->customer_email}");
            } else {
                $this->error("Transaction not found for reference: {$reference}");
            }
        } else {
            $transactions = Transaction::latest()->take(5)->get();
            $this->info("Latest 5 transactions:");
            foreach ($transactions as $transaction) {
                $this->line("{$transaction->reference} - {$transaction->status} - {$transaction->amount} - {$transaction->customer_email}");
            }
        }
    }
}