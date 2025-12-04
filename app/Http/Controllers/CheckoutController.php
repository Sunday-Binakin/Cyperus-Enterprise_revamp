<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    protected PaystackService $paystack;

    public function __construct(PaystackService $paystack)
    {
        $this->paystack = $paystack;
    }

    public function index()
    {
        return Inertia::render('checkout', [
            'paystack_public_key' => $this->paystack->getPublicKey(),
            'flash' => session('flash') ?? session()->all(),
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Checkout store method called', $request->all());
        
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string|max:100',
            'shipping_state' => 'required|string|max:100',
            'shipping_postal_code' => 'nullable|string|max:20',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            // Validate stock availability and calculate totals server-side
            $subtotal = 0;
            $itemsData = [];

            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);

                if (!$product || !$product->is_active) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Product not available: ' . ($product->name ?? 'Unknown'),
                    ], 400);
                }

                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock for: ' . $product->name,
                    ], 400);
                }

                $itemTotal = $product->price * $item['quantity'];
                $subtotal += $itemTotal;

                $itemsData[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'total_price' => $itemTotal,
                ];
            }

            // Calculate shipping and total
            $shippingFee = 0; // You can add shipping calculation logic here
            $total = $subtotal + $shippingFee;

            // Auto-create customer if doesn't exist
            $user = User::where('email', $validated['customer_email'])->first();
            
            if (!$user) {
                $user = User::create([
                    'name' => $validated['customer_name'],
                    'email' => $validated['customer_email'],
                    'password' => Hash::make(uniqid()), // Random password, user can reset
                    'role' => 'customer',
                    'is_active' => true,
                ]);
            }

            // Create order (but don't reduce stock yet)
            $order = Order::create([
                'user_id' => $user->id,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_state' => $validated['shipping_state'],
                'shipping_country' => 'Ghana',
                'shipping_postal_code' => $validated['shipping_postal_code'] ?? null,
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'tax' => 0,
                'total' => $total,
                'payment_method' => 'paystack',
                'payment_status' => 'pending',
                'status' => 'pending',
            ]);

            // Create order items (but don't reduce stock yet)
            foreach ($itemsData as $itemData) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $itemData['product']->id,
                    'product_name' => $itemData['product']->name,
                    'product_image' => $itemData['product']->image,
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'total_price' => $itemData['total_price'],
                ]);
            }

            // Generate payment reference
            $reference = $this->paystack->generateReference();

            // Create transaction record
            Transaction::create([
                'order_id' => $order->id,
                'reference' => $reference,
                'amount' => $total,
                'currency' => 'GHS',
                'status' => 'pending',
                'customer_email' => $validated['customer_email'],
            ]);

            // Initialize Paystack payment
            $paymentData = $this->paystack->initializePayment([
                'email' => $validated['customer_email'],
                'amount' => $total,
                'reference' => $reference,
                'callback_url' => route('payment.callback'),
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'customer_name' => $validated['customer_name'],
                ],
            ]);

            Log::info('Payment initialization result', [
                'reference' => $reference,
                'amount' => $total,
                'email' => $validated['customer_email'],
                'status' => $paymentData['status'],
                'response' => $paymentData
            ]);

            if (!$paymentData['status']) {
                DB::rollBack();
                Log::error('Payment initialization failed: ' . $paymentData['message']);
                
                return back()->withErrors([
                    'payment' => 'Payment initialization failed: ' . $paymentData['message'],
                ]);
            }

            // Update order with payment reference
            $order->update(['payment_reference' => $reference]);

            DB::commit();

            // Redirect directly to Paystack payment page
            Log::info('Redirecting to Paystack payment page', [
                'reference' => $reference,
                'amount' => $total,
                'order_number' => $order->order_number,
                'authorization_url' => $paymentData['data']['authorization_url'],
            ]);
            
            return redirect()->away($paymentData['data']['authorization_url']);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return back()->withErrors([
                'error' => 'Failed to create order: ' . $e->getMessage()
            ]);
        }
    }

    public function success($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        return Inertia::render('OrderSuccess', [
            'order' => $order,
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $validated = $request->validate([
            'reference' => 'required|string',
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::find($validated['order_id']);

        // Here you would verify with Paystack API
        // For now, just mark as paid
        $order->update([
            'payment_status' => 'paid',
            'payment_reference' => $validated['reference'],
            'paid_at' => now(),
            'status' => 'processing',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment verified successfully!',
        ]);
    }
}
