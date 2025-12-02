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
        $reference = $request->query('reference');

        if (!$reference) {
            return redirect()->route('home')->with('error', 'Invalid payment reference');
        }

        // Verify payment with Paystack
        $verification = $this->paystack->verifyPayment($reference);

        if (!$verification['status']) {
            return redirect()->route('home')->with('error', 'Payment verification failed');
        }

        $paymentData = $verification['data'];
        
        // Find transaction
        $transaction = Transaction::where('reference', $reference)->first();

        if (!$transaction) {
            return redirect()->route('home')->with('error', 'Transaction not found');
        }

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

            // Update transaction
            $transaction->update([
                'transaction_id' => $paymentData['id'],
                'status' => $paymentData['status'] === 'success' ? 'success' : 'failed',
                'channel' => $paymentData['channel'] ?? null,
                'paid_at' => $paymentData['status'] === 'success' ? now() : null,
                'gateway_response' => $paymentData,
            ]);

            $order = $transaction->order;

            if ($paymentData['status'] === 'success') {
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
                    'payment_status' => 'failed',
                    'status' => 'cancelled',
                ]);

                DB::commit();

                return redirect()->route('home')->with('error', 'Payment failed. Please try again.');
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
        // Verify webhook signature
        $signature = $request->header('x-paystack-signature');
        $payload = $request->getContent();

        if (!$this->paystack->verifyWebhookSignature($signature, $payload)) {
            Log::warning('Invalid Paystack webhook signature');
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $event = $request->all();

        // Handle different event types
        switch ($event['event']) {
            case 'charge.success':
                $this->handleSuccessfulCharge($event['data']);
                break;

            case 'charge.failed':
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
}
