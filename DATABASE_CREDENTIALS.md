# 🔐 Database & Login Credentials

## Database Summary

✅ **Database has been successfully populated with:**

### Users
- **2 Users** (1 Admin + 1 Customer)

### Content
- **6 Categories**: Original, Choconut, Ginger, Citrus Limon Clove, Lemon Grass, Bitter Kola
- **12 Products**: 2 products per category (500g and 250g variants)
- **6 Blog Posts**: Mix of published and draft posts with comments

### Orders
- **0 Orders** (Will be created when customers place orders)

---

## 🔑 Login Credentials

### Admin Account
- **Email**: `admin@cyperus.com`
- **Password**: `password`
- **Access**: Full admin panel at `/admin`

### Test Customer Account
- **Email**: `customer@example.com`
- **Password**: `password`
- **Access**: Can place orders and leave blog comments

---

## 📍 Important URLs

### Client (Public) Pages
- **Home**: `/`
- **Products**: `/products`
- **Cart**: `/cart`
- **Checkout**: `/checkout`
- **Blog**: `/blog`

### Admin Pages
- **Dashboard**: `/admin`
- **Products Management**: `/admin/products`
- **Categories Management**: `/admin/categories`
- **Orders Management**: `/admin/orders`
- **Blog Management**: `/admin/blogs`
- **Messages**: `/admin/messages`
- **Notifications**: `/admin/notifications`
- **Activity Logs**: `/admin/activity-logs`

---

## 💾 Sample Data Details

### Categories (6 total)
1. **Original** - Original tigernut products
2. **Choconut** - Chocolate flavored tigernut
3. **Ginger** - Ginger flavored tigernut
4. **Citrus Limon Clove** - Citrus lemon with clove
5. **Lemon Grass** - Lemon grass flavored
6. **Bitter Kola** - Bitter kola flavored

### Products (12 total - 2 per category)
Each category has:
- **500g package** (GH₵150.00 - GH₵200.00)
- **250g package** (GH₵80.00 - GH₵120.00)

All products include:
- Premium quality description
- Rich in nutrients, High in fiber, Natural ingredients
- Random stock levels (50-200 units)
- Some marked as featured

### Blog Posts (6 total)
1. **Welcome to Our New Blog** (Published, Featured)
2. **5 Tips for Choosing the Right Product** (Published, Featured)
3. **The Future of E-Commerce in Ghana** (Published)
4. **Customer Success Story: Jane's Experience** (Published, Featured)
5. **How to Care for Your Products** (Published)
6. **Upcoming Product Launches** (Draft)

Each published blog has:
- Random views (10-500)
- Sample comments (some pending, some approved)
- Tags for categorization

---

## 🔄 Re-seeding the Database

If you need to reset and re-populate the database:

```bash
# Reset database and run all migrations
php artisan migrate:fresh

# Seed all data
php artisan db:seed

# Seed only blogs (if already migrated)
php artisan db:seed --class=BlogSeeder
```

---

## 🧪 Testing the Application

### As Admin:
1. Login at `/login` with admin credentials
2. Access `/admin` dashboard
3. Manage products, categories, orders
4. Create/edit blog posts
5. Moderate comments
6. View messages and notifications

### As Customer:
1. Browse products at `/`
2. Add items to cart
3. Proceed to checkout
4. Read blog posts at `/blog`
5. Leave comments on blog posts

### Guest Users:
1. Browse all public pages
2. View products and blog posts
3. Add items to cart
4. Must login/register to checkout

---

## 💡 Tips

- All passwords are set to `password` for testing
- Products have random stock levels
- Some products are marked as "featured"
- Blog comments require admin approval
- Orders will create customer accounts automatically if email doesn't exist
- Currency is set to GH₵ (Ghana Cedis)

---

## 🎯 What's Working

✅ User authentication and authorization
✅ Product catalog with categories
✅ Shopping cart functionality
✅ Checkout process
✅ Blog system with comments
✅ Admin dashboard with statistics
✅ Order management
✅ Message/contact form system
✅ Activity logging
✅ Notifications system
✅ Image uploads for blog posts
✅ Auto-customer creation from orders

---

## 🚀 Ready to Use!

Your database is now fully populated and ready for testing. Login with the admin credentials above to start managing your e-commerce store!

