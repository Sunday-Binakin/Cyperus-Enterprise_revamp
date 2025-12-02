# Testing Payment Flow - Step by Step Guide

## Current Status
✅ Cart functionality working
✅ Checkout page rendering
✅ Form validation working
✅ Paystack integration code complete

## What's Happening
When you click "Pay", the system is trying to initialize a payment with Paystack, but you need to configure your Paystack API keys first.

## Steps to Test Payment Flow

### 1. Configure Paystack Keys (REQUIRED)

Add these lines to your `.env` file (located at the root of your project):

```env
PAYSTACK_PUBLIC_KEY=pk_test_136958e9da0c7d27ad6aec58947641796fac1ea8
PAYSTACK_SECRET_KEY=sk_test_7ca619ab7de87f3c9c1e7a8ce9b284a7027fc2db
PAYSTACK_MERCHANT_EMAIL=estherjohnson83@gmail.com
```

### 2. Clear Laravel Config Cache

Run this command in your terminal:
```bash
D:\laragon\bin\php\php-8.3.20-nts-Win32-vs16-x64\php.exe artisan config:clear
```

### 3. Test the Full Flow

1. **Add Product to Cart**
   - Go to any category page
   - Click "ADD TO BASKET" on a product
   - You should see cart badge update to "1"

2. **Go to Checkout**
   - Navigate to `/checkout` or click cart icon
   - Fill in delivery information:
     - Full Name: John Doe
     - Email: test@example.com
     - Phone: 0244123456
     - Address: 123 Main Street
     - City: Accra
     - Region: Greater Accra

3. **Click Pay Button**
   - System will create an order in the database
   - System will initialize payment with Paystack
   - You'll be redirected to Paystack's test checkout page
   - The URL will be something like: `https://checkout.paystack.com/...`

4. **Complete Test Payment**
   Use Paystack's test card details:
   - Card Number: `4084 0840 8408 4081` or `5060 6666 6666 6666 66`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: `123` or any 3 digits
   - PIN: `1234` (if required)
   - OTP: `123456` (if required)

5. **Payment Verification**
   - After successful payment, you'll be redirected back to your site
   - You should see an "Order Success" page
   - Order will be saved to database with payment status "paid"
   - Product stock will be reduced
   - Admin will see the order in `/admin/orders`

## Troubleshooting

### If nothing happens after clicking "Pay":

1. **Check Laravel Logs**
   ```bash
   # View the last 50 lines of the log file
   Get-Content D:\laragon\www\cyperus_ent\storage\logs\laravel.log -Tail 50
   ```

2. **Check Browser Console**
   - Press F12 in your browser
   - Go to "Console" tab
   - Look for any red error messages

3. **Verify Paystack Keys are Loaded**
   - After adding keys to `.env`, you MUST run `php artisan config:clear`
   - Restart your Laravel server if needed

### If you see "Payment initialization failed":
   - Check if Paystack keys are correctly added to `.env`
   - Make sure you ran `php artisan config:clear`
   - Check if your Paystack test keys are valid

### If form validation errors appear:
   - Make sure all required fields are filled
   - Check that email format is valid
   - Ensure phone number is not empty

## What Happens Behind the Scenes

1. **Form Submission** → Validates delivery info
2. **Order Creation** → Creates order record in `orders` table
3. **Transaction Creation** → Creates transaction record in `transactions` table
4. **Paystack API Call** → Initializes payment and gets authorization URL
5. **Redirect** → Takes you to Paystack checkout page
6. **Payment** → Customer completes payment on Paystack
7. **Callback** → Paystack redirects back to your site with payment result
8. **Verification** → System verifies payment with Paystack API
9. **Stock Update** → Reduces product stock if payment successful
10. **Notification** → Creates admin notification about new order

## Current Database Tables

- `orders` - Stores customer and shipping information
- `order_items` - Stores products in each order
- `transactions` - Stores payment transaction details
- `products` - Product information (stock gets reduced on successful payment)

## Testing with Real Money

⚠️ **IMPORTANT**: The keys provided are TEST keys. They will NOT charge real money.

To accept real payments:
1. Get your LIVE keys from Paystack dashboard
2. Replace `pk_test_...` with `pk_live_...`
3. Replace `sk_test_...` with `sk_live_...`
4. Test thoroughly before going live!

## Need Help?

If payment still doesn't work after following these steps, please provide:
1. Any error messages from browser console (F12)
2. Last 20 lines from Laravel log file
3. Screenshot of what you see after clicking "Pay"

