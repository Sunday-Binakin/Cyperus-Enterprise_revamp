<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

// Register Fortify routes
require __DIR__.'/../vendor/laravel/fortify/routes/routes.php';

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [HomeController::class, 'products'])->name('products');
Route::get('/products/{slug}', [HomeController::class, 'productDetail'])->name('product.detail');
Route::get('/category/{slug}', [HomeController::class, 'category'])->name('category');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart');

// Checkout
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order-success/{orderNumber}', [CheckoutController::class, 'success'])->name('order.success');

// Payment
Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');
Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');
Route::get('/payment/status', [PaymentController::class, 'checkStatus'])->name('payment.status');
Route::get('/payment-test', function() {
    return Inertia::render('payment-test');
})->name('payment.test');

// Test payment verification
Route::get('/test-payment/{reference}', function($reference) {
    $paystack = new \App\Services\PaystackService();
    $result = $paystack->verifyPayment($reference);
    return response()->json($result);
});

// Messages (Form Submissions)
Route::post('/contact', [MessageController::class, 'store'])->name('contact.submit');

// Blog Routes (Client)
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{blog}/comments', [\App\Http\Controllers\BlogController::class, 'storeComment'])->name('blog.comments.store');

// Static Pages
Route::get('/about-us', function () {
    return inertia('about-us');
})->name('about-us');

Route::get('/contact-us', function () {
    return inertia('contact-us');
})->name('contact-us');

Route::get('/export-department', function () {
    return inertia('export-department');
})->name('export-department');

Route::get('/local-distributors', function () {
    return inertia('local-distributors');
})->name('local-distributors');

Route::get('/international-distributors', function () {
    return inertia('international-distributors');
})->name('international-distributors');

Route::get('/recipes', function () {
    return inertia('recipes');
})->name('recipes');

// Dashboard redirect - redirect to home or admin based on role
Route::get('/dashboard', function () {
    if (\Illuminate\Support\Facades\Auth::check() && \Illuminate\Support\Facades\Auth::user()->role === 'admin') {
        return redirect('/admin');
    }
    return redirect('/');
})->middleware('auth')->name('dashboard');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin', 'log.activity'])->group(function () {
    
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Products
    Route::resource('products', ProductController::class);
    Route::post('products/{product}/toggle-status', [ProductController::class, 'toggleStatus'])->name('products.toggle-status');

    // Categories
    Route::resource('categories', CategoryController::class);
    Route::post('categories/{category}/toggle-status', [CategoryController::class, 'toggleStatus'])->name('categories.toggle-status');

    // Orders
    Route::resource('orders', OrderController::class)->except(['create', 'edit']);
    Route::post('orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');

    // Messages
    Route::get('messages', [AdminMessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [AdminMessageController::class, 'show'])->name('messages.show');
    Route::post('messages/{message}/status', [AdminMessageController::class, 'updateStatus'])->name('messages.update-status');
    Route::post('messages/{message}/mark-read', [AdminMessageController::class, 'markAsRead'])->name('messages.mark-read');
    Route::delete('messages/{message}', [AdminMessageController::class, 'destroy'])->name('messages.destroy');

    // Blog Management
    Route::resource('blogs', \App\Http\Controllers\Admin\BlogController::class);
    Route::post('blog-comments/{comment}/approve', [\App\Http\Controllers\Admin\BlogController::class, 'approveComment'])->name('blog-comments.approve');
    Route::post('blog-comments/{comment}/reject', [\App\Http\Controllers\Admin\BlogController::class, 'rejectComment'])->name('blog-comments.reject');

    // Testimonials Management
    Route::resource('testimonials', TestimonialController::class);
    Route::post('testimonials/{testimonial}/toggle-status', [TestimonialController::class, 'toggleStatus'])->name('testimonials.toggle-status');
    Route::post('testimonials/{id}/restore', [TestimonialController::class, 'restore'])->name('testimonials.restore');
    Route::delete('testimonials/{id}/force-delete', [TestimonialController::class, 'forceDelete'])->name('testimonials.force-delete');

    // Notifications
    Route::get('notifications', function () {
        $notifications = \App\Models\Notification::latest()->paginate(20);
        return inertia('Admin/Notifications', ['notifications' => $notifications]);
    })->name('notifications.index');

    Route::post('notifications/{notification}/read', function (\App\Models\Notification $notification) {
        $notification->markAsRead();
        
        // If the notification has a link, redirect to it
        if ($notification->link) {
            return redirect($notification->link);
        }
        
        return back();
    })->name('notifications.read');

    // Activity Logs
    Route::get('activity-logs', function () {
        $logs = \App\Models\ActivityLog::with('user')->latest()->paginate(50);
        return inertia('Admin/ActivityLogs', ['logs' => $logs]);
    })->name('activity-logs.index');

    // Messages 
    Route::get('messages', [AdminMessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [AdminMessageController::class, 'show'])->name('messages.show');
    Route::post('messages/{message}/mark-read', [AdminMessageController::class, 'markAsRead'])->name('messages.mark-read');
    Route::delete('messages/{message}', [AdminMessageController::class, 'destroy'])->name('messages.destroy');
});

// Settings routes (if exists)
if (file_exists(__DIR__.'/settings.php')) {
    require __DIR__.'/settings.php';
}
