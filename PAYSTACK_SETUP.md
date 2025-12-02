# Paystack Integration Setup Guide

## ✅ What Has Been Implemented

### 1. **Database Structure**
- `orders` table - Stores customer and order information
- `order_items` table - Stores individual products in each order
- `transactions` table - Stores Paystack payment records

### 2. **Paystack Service** (`app/Services/PaystackService.php`)
- Initialize payments
- Verify payments
- Verify webhook signatures
- Generate unique payment references

### 3. **Controllers**
- **CheckoutController** - Handles checkout form, creates orders, initiates Paystack payment
- **PaymentController** - Handles payment callbacks and webhooks

### 4. **Frontend Pages**
- `/checkout` - Collects delivery information
- `/order-success/{orderNumber}` - Shows order confirmation
- `/admin/orders` - Admin orders management page

### 5. **Payment Flow**
1. Customer adds items to cart
2. Customer fills delivery information at `/checkout`
3. Order created with `pending` status (stock NOT reduced yet)
4. Customer redirected to Paystack payment page
5. After payment, Paystack redirects to `/payment/callback`
6. Payment verified with Paystack API
7. If successful:
   - Order status → `processing`
   - Payment status → `paid`
   - Stock reduced
   - Admin notification created
8. Customer sees order success page

## 🔧 Required Configuration

### Step 1: Get Paystack API Keys

1. Sign up at https://paystack.com/
2. Go to Settings → API Keys & Webhooks
3. Copy your **Test Public Key** and **Test Secret Key**

### Step 2: Add Keys to `.env`

Add these lines to your `.env` file:

```env
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_MERCHANT_EMAIL=your@email.com
```

### Step 3: Setup Webhook (Important!)

1. In Paystack Dashboard, go to Settings → API Keys & Webhooks
2. Click on "Webhooks"
3. Add your webhook URL: `https://yourdomain.com/payment/webhook`
4. Select events: `charge.success`, `charge.failed`

**For Local Testing:**
- Use ngrok: `ngrok http 9000`
- Use the ngrok URL for webhook: `https://xxxxx.ngrok.io/payment/webhook`

## 🔒 Security Features

✅ **Server-side amount validation** - Prices calculated on backend
✅ **Webhook signature verification** - Prevents fake payment notifications
✅ **Idempotency** - Prevents duplicate order processing
✅ **Stock validation** - Checks availability before payment
✅ **Transaction logging** - All payment attempts recorded

## 🧪 Testing

### Test Cards (Paystack Test Mode)

**Successful Payment:**
- Card: `4084 0840 8408 4081 5408`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`
- OTP: `123456`

**Failed Payment:**
- Card: `5060 6666 6666 6666 666`

### Test Flow

1. Add products to cart
2. Go to checkout
3. Fill delivery information
4. Click "Pay"
5. Use test card above
6. Complete Paystack payment
7. You'll be redirected to order success page
8. Check admin dashboard - order should appear with "Processing" status

## 📊 Admin Features

- View all orders at `/admin/orders`
- See order details, customer info, items
- Track payment and order status
- Total revenue automatically calculated from paid orders
- Real-time notifications for new orders

## ⚠️ Important Notes

1. **Webhook is Critical** - Always verify webhooks for production
2. **HTTPS Required** - Paystack requires HTTPS in production
3. **Stock Management** - Stock only reduced after successful payment
4. **Guest Checkout** - Customers don't need accounts to order
5. **Email Notifications** - TODO: Setup email notifications for customers

## 🚀 Going Live

1. Get Production API keys from Paystack
2. Update `.env` with production keys
3. Setup webhook with production URL
4. Test with real (small amount) transactions
5. Enable email notifications
6. Setup proper error logging

## 📝 TODO (Optional Enhancements)

- [ ] Email notifications to customers
- [ ] SMS notifications
- [ ] Order tracking page for customers
- [ ] Invoice PDF generation
- [ ] Refund handling
- [ ] Multiple payment methods (Mobile Money)
- [ ] Delivery fee calculation based on location
- [ ] Discount codes/coupons

---

## Current Status

✅ Payment integration complete
✅ Order management working
✅ Revenue tracking functional
⚠️ Requires Paystack API keys in `.env`
⚠️ Webhook needs to be configured on Paystack dashboard


