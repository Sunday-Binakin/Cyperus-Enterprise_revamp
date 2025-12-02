<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['items.product', 'user']);

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('order_number', 'like', '%' . $request->search . '%')
                  ->orWhere('customer_name', 'like', '%' . $request->search . '%')
                  ->orWhere('customer_email', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by payment status
        if ($request->has('payment_status') && $request->payment_status !== 'all') {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->latest()->paginate(20);

        // Calculate stats
        $totalOrders = Order::count();
        $activeOrders = Order::whereIn('status', ['pending', 'processing', 'shipped'])->count();
        $completedOrders = Order::where('status', 'delivered')->count();
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? 'all',
                'payment_status' => $request->payment_status ?? 'all',
            ],
            'totalOrders' => $totalOrders,
            'activeOrders' => $activeOrders,
            'completedOrders' => $completedOrders,
            'totalRevenue' => number_format($totalRevenue, 0),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'user']);

        return Inertia::render('Admin/OrderDetail', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $oldStatus = $order->status;
        $order->update($validated);

        // If delivered, set delivered_at
        if ($validated['status'] === 'delivered' && !$order->delivered_at) {
            $order->update(['delivered_at' => now()]);
        }

        // Log activity
        ActivityLog::logActivity(
            'updated',
            $order,
            auth()->user()->name . ' changed order ' . $order->order_number . ' status from "' . $oldStatus . '" to "' . $validated['status'] . '"',
            ['status' => $oldStatus],
            ['status' => $validated['status']]
        );

        return back()->with('success', 'Order status updated successfully!');
    }

    public function destroy(Order $order)
    {
        // Only allow cancellation, not deletion
        if ($order->status === 'delivered') {
            return back()->with('error', 'Cannot cancel a delivered order.');
        }

        $order->update(['status' => 'cancelled']);

        // Log activity
        ActivityLog::logActivity(
            'cancelled',
            $order,
            auth()->user()->name . ' cancelled order: ' . $order->order_number
        );

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order cancelled successfully!');
    }
}
