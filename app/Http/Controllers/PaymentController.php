<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Models\Transaction;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected PaystackService $paystack;

    public function __construct(PaystackService $paystack)
    {
        $this->paystack = $paystack;
    }

    /**
     * Handle payment callback from Paystack
     */
    public function callback(Request $request)
    {
        Log::info('Payment callback received', [
            'query_params' => $request->query(),
            'all_params' => $request->all()
        ]);

        $reference = $request->query('reference');

        if (!$reference) {
            Log::error('Payment callback: Missing reference');
            return redirect()->route('home')->with('error', 'Invalid payment reference');
        }

        // Verify payment with Paystack
        $verification = $this->paystack->verifyPayment($reference);

        Log::info('Payment verification result', [
            'reference' => $reference,
            'status' => $verification['status']
        ]);

        if (!$verification['status']) {
            Log::error('Payment verification failed', [
                'reference' => $reference,
                'status' => $verification['status']
            ]);
            return redirect()->route('home')->with('error', 'Payment verification failed');
        }

        $paymentData = $verification['data'];
        
        // Find transaction
        $transaction = Transaction::where('reference', $reference)->first();

        if (!$transaction) {
            Log::error('Transaction not found', ['reference' => $reference]);
            return redirect()->route('home')->with('error', 'Transaction not found');
        }

        Log::info('Transaction found', [
            'reference' => $reference,
            'current_status' => $transaction->status,
            'payment_status' => $paymentData['status']
        ]);

        // Check if already processed
        if ($transaction->status === 'success') {
            $order = $transaction->order;
            return Inertia::render('order-success', [
                'order' => $order->load('items.product'),
            ]);
        }

        // Process payment
        try {
            DB::beginTransaction();

            // Determine final status based on Paystack response
            $paystackStatus = $paymentData['status'];
            $finalStatus = 'failed';
            $paidAt = null;
            $orderStatus = 'cancelled';
            $paymentStatus = 'failed';

            if ($paystackStatus === 'success') {
                $finalStatus = 'success';
                $paidAt = now();
                $orderStatus = 'processing';
                $paymentStatus = 'paid';
            } elseif ($paystackStatus === 'abandoned') {
                // User abandoned payment - redirect to checkout with message
                DB::rollBack();
                return redirect()->route('checkout')->with('error', 'Payment was cancelled. Please try again.');
            }

            // Update transaction
            $transaction->update([
                'transaction_id' => $paymentData['id'],
                'status' => $finalStatus,
                'channel' => $paymentData['channel'] ?? null,
                'paid_at' => $paidAt,
                'gateway_response' => $paymentData,
            ]);

            $order = $transaction->order;

            if ($finalStatus === 'success') {
                // Update order
                $order->update([
                    'payment_status' => 'paid',
                    'paid_at' => now(),
                    'status' => 'processing',
                ]);

                // Reduce stock for each item
                foreach ($order->items as $item) {
                    $product = $item->product;
                    if ($product) {
                        $product->decrement('stock', $item->quantity);
                    }
                }

                // Create notification for admin
                Notification::createNotification(
                    'order',
                    'New Order Received',
                    'Order ' . $order->order_number . ' from ' . $order->customer_name . ' (GH₵' . number_format($order->total, 2) . ')',
                    route('admin.orders.show', $order->id),
                    [
                        'order_id' => $order->id,
                        'order_number' => $order->order_number,
                        'total' => $order->total,
                    ]
                );

                DB::commit();

                return Inertia::render('order-success', [
                    'order' => $order->load('items.product'),
                ]);
            } else {
                // Payment failed
                $order->update([
                    'payment_status' => $paymentStatus,
                    'status' => $orderStatus,
                ]);

                DB::commit();

                Log::info('Payment failed for order: ' . $order->order_number, [
                    'paystack_status' => $paystackStatus,
                    'reference' => $reference
                ]);

                return redirect()->route('checkout')->with('error', 'Payment failed. Please try again.');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Payment callback error: ' . $e->getMessage());

            return redirect()->route('home')->with('error', 'An error occurred while processing your payment');
        }
    }

    /**
     * Handle webhook from Paystack
     */
    public function webhook(Request $request)
    {
        Log::info('Paystack webhook received');

        // Verify webhook signature
        $signature = $request->header('x-paystack-signature');
        $payload = $request->getContent();

        if (!$signature) {
            Log::warning('Missing Paystack webhook signature');
            return response()->json(['error' => 'Missing signature'], 401);
        }

        if (!$this->paystack->verifyWebhookSignature($signature, $payload)) {
            Log::warning('Invalid Paystack webhook signature');
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $event = $request->all();
        Log::info('Paystack webhook event', [
            'event_type' => $event['event'] ?? 'unknown'
        ]);

        // Handle different event types
        switch ($event['event']) {
            case 'charge.success':
                Log::info('Processing successful charge');
                $this->handleSuccessfulCharge($event['data']);
                break;

            case 'charge.failed':
                Log::info('Processing failed charge');
                $this->handleFailedCharge($event['data']);
                break;

            default:
                Log::info('Unhandled Paystack webhook event: ' . $event['event']);
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Handle successful charge
     */
    protected function handleSuccessfulCharge(array $data)
    {
        try {
            DB::beginTransaction();

            $reference = $data['reference'];
            $transaction = Transaction::where('reference', $reference)->first();

            if (!$transaction || $transaction->status === 'success') {
                // Already processed
                DB::rollBack();
                return;
            }

            // Update transaction
            $transaction->update([
                'transaction_id' => $data['id'],
                'status' => 'success',
                'channel' => $data['channel'] ?? null,
                'paid_at' => now(),
                'gateway_response' => $data,
            ]);

            $order = $transaction->order;

            // Update order
            $order->update([
                'payment_status' => 'paid',
                'paid_at' => now(),
                'status' => 'processing',
            ]);

            // Reduce stock
            foreach ($order->items as $item) {
                $product = $item->product;
                if ($product) {
                    $product->decrement('stock', $item->quantity);
                }
            }

            // Create notification
            Notification::createNotification(
                'order',
                'New Order Received',
                'Order ' . $order->order_number . ' from ' . $order->customer_name . ' (GH₵' . number_format($order->total, 2) . ')',
                route('admin.orders.show', $order->id),
                [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'total' => $order->total,
                ]
            );

            DB::commit();

            Log::info('Webhook: Order ' . $order->order_number . ' payment confirmed');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Webhook success charge error: ' . $e->getMessage());
        }
    }

    /**
     * Handle failed charge
     */
    protected function handleFailedCharge(array $data)
    {
        try {
            $reference = $data['reference'];
            $transaction = Transaction::where('reference', $reference)->first();

            if (!$transaction) {
                return;
            }

            $transaction->update([
                'status' => 'failed',
                'gateway_response' => $data,
            ]);

            $order = $transaction->order;
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);

            Log::info('Webhook: Order ' . $order->order_number . ' payment failed');

        } catch (\Exception $e) {
            Log::error('Webhook failed charge error: ' . $e->getMessage());
        }
    }

    /**
     * Check payment status (for frontend polling)
     * Requires the transaction reference and customer email for security
     */
    public function checkStatus(Request $request)
    {
        $reference = $request->get('reference');
        $email = $request->get('email');
        
        if (!$reference || !$email) {
            return response()->json(['error' => 'Reference and email required'], 400);
        }

        $transaction = Transaction::where('reference', $reference)
            ->where('customer_email', $email)
            ->first();
        
        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }

        // If still pending, check with Paystack
        if ($transaction->status === 'pending') {
            $verification = $this->paystack->verifyPayment($reference);
            
            if ($verification['status']) {
                $paymentData = $verification['data'];
                
                if ($paymentData['status'] === 'success') {
                    // Update transaction and order
                    DB::beginTransaction();
                    
                    $transaction->update([
                        'transaction_id' => $paymentData['id'],
                        'status' => 'success',
                        'channel' => $paymentData['channel'] ?? null,
                        'paid_at' => now(),
                    ]);

                    $order = $transaction->order;
                    $order->update([
                        'payment_status' => 'paid',
                        'paid_at' => now(),
                        'status' => 'processing',
                    ]);

                    // Reduce stock
                    foreach ($order->items as $item) {
                        $product = $item->product;
                        if ($product) {
                            $product->decrement('stock', $item->quantity);
                        }
                    }

                    DB::commit();
                    
                    Log::info('Payment verified and order updated', [
                        'reference' => $reference,
                        'order_number' => $order->order_number,
                    ]);
                }
            }
        }

        return response()->json([
            'status' => $transaction->status,
            'payment_status' => $transaction->order->payment_status ?? null,
            'order_number' => $transaction->order->order_number ?? null,
        ]);
    }
}
