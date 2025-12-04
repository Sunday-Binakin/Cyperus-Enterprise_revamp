<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get statistics
        $totalRevenue = (float) Order::where('payment_status', 'paid')->sum('total');
        $totalOrders = (int) Order::count();
        $totalProducts = (int) Product::count();
        $totalCustomers = (int) User::where('role', 'customer')->count();

        // Recent orders
        $recentOrders = Order::with('items')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->order_number,
                    'customer' => $order->customer_name,
                    'product' => $order->items->first()?->product_name ?? 'Multiple items',
                    'amount' => 'GH₵' . number_format($order->total, 2),
                    'status' => $order->status,
                    'date' => $order->created_at->format('Y-m-d'),
                ];
            });

        // Get unread notifications
        $unreadNotifications = Notification::unread()
            ->latest()
            ->take(10)
            ->get();

        // Low stock products (less than 20 units)
        $lowStockProducts = (int) Product::where('stock', '<', 20)->count();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentOrders' => $recentOrders,
            'notifications' => $unreadNotifications,
        ]);
    }
}
