<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get statistics
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCustomers = User::where('role', 'customer')->count();

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

        // Statistics with changes (mock for now)
        $stats = [
            [
                'name' => 'Total Revenue',
                'value' => 'GH₵' . number_format($totalRevenue, 2),
                'change' => '+12.5%',
                'changeType' => 'positive',
            ],
            [
                'name' => 'Orders',
                'value' => (string)$totalOrders,
                'change' => '+8.2%',
                'changeType' => 'positive',
            ],
            [
                'name' => 'Products',
                'value' => (string)$totalProducts,
                'change' => '+' . Product::whereDate('created_at', today())->count(),
                'changeType' => 'positive',
            ],
            [
                'name' => 'Customers',
                'value' => (string)$totalCustomers,
                'change' => '+15.3%',
                'changeType' => 'positive',
            ],
        ];

        // Get unread notifications
        $unreadNotifications = Notification::unread()
            ->latest()
            ->take(10)
            ->get();

        // Low stock products (less than 20 units)
        $lowStockProducts = Product::where('stock', '<', 20)->count();

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
