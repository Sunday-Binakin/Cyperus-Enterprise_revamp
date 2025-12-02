<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogComment;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            $this->command->warn('No admin user found. Skipping blog seeding.');
            return;
        }

        // Create sample blog posts
        $blogs = [
            [
                'title' => 'Welcome to Our New Blog',
                'excerpt' => 'We are excited to announce the launch of our new blog where we will share updates, tips, and insights about our products.',
                'content' => '<p>Welcome to our brand new blog! We are thrilled to have this platform to connect with our community and share valuable content.</p><p>In this blog, you will find:</p><ul><li>Product updates and announcements</li><li>Tips and tricks for using our products</li><li>Industry insights and trends</li><li>Customer success stories</li></ul><p>We encourage you to subscribe to our blog and stay tuned for more exciting content!</p>',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'featured' => true,
                'tags' => ['announcement', 'welcome'],
            ],
            [
                'title' => '5 Tips for Choosing the Right Product',
                'excerpt' => 'Learn how to select the perfect product for your needs with these expert tips and recommendations.',
                'content' => '<p>Choosing the right product can be overwhelming with so many options available. Here are 5 tips to help you make the best decision:</p><h2>1. Understand Your Needs</h2><p>Before making a purchase, clearly define what you need the product for.</p><h2>2. Set a Budget</h2><p>Determine how much you are willing to spend and stick to it.</p><h2>3. Read Reviews</h2><p>Customer reviews provide valuable insights into product quality and performance.</p><h2>4. Compare Options</h2><p>Don\'t settle for the first option you find. Compare multiple products.</p><h2>5. Check the Warranty</h2><p>A good warranty is a sign of quality and gives you peace of mind.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'featured' => true,
                'tags' => ['tips', 'shopping guide'],
            ],
            [
                'title' => 'The Future of E-Commerce in Ghana',
                'excerpt' => 'Explore the trends and innovations shaping the future of online shopping in Ghana.',
                'content' => '<p>The e-commerce landscape in Ghana is rapidly evolving. With increasing internet penetration and mobile adoption, more Ghanaians are shopping online than ever before.</p><h2>Key Trends</h2><ul><li><strong>Mobile Commerce:</strong> More shoppers are using their phones to make purchases.</li><li><strong>Payment Innovation:</strong> New payment methods are making transactions easier and more secure.</li><li><strong>Local Delivery:</strong> Improved logistics networks are enabling faster deliveries.</li><li><strong>Social Commerce:</strong> Businesses are leveraging social media platforms for sales.</li></ul><p>We are excited to be part of this revolution and are committed to providing the best online shopping experience for our customers.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'featured' => false,
                'tags' => ['e-commerce', 'trends', 'Ghana'],
            ],
            [
                'title' => 'Customer Success Story: Jane\'s Experience',
                'excerpt' => 'Read how our products helped Jane transform her business and achieve her goals.',
                'content' => '<p>We love hearing from our customers! Today, we\'re sharing Jane\'s inspiring story.</p><blockquote>"I was struggling to find quality products for my business until I discovered this store. The products are top-notch, and the customer service is exceptional!" - Jane A.</blockquote><p>Jane runs a small retail business in Accra and has been our customer for over a year. She appreciates:</p><ul><li>The wide variety of products available</li><li>Fast and reliable delivery</li><li>Excellent customer support</li><li>Competitive pricing</li></ul><p>Thank you, Jane, for sharing your story with us. We are honored to be part of your success!</p>',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'featured' => true,
                'tags' => ['customer story', 'testimonial'],
            ],
            [
                'title' => 'How to Care for Your Products',
                'excerpt' => 'Proper maintenance extends the life of your products. Learn the best care practices here.',
                'content' => '<p>Taking good care of your products ensures they last longer and perform better. Here are some general care tips:</p><h2>Cleaning</h2><p>Regular cleaning prevents buildup and keeps products looking new. Use appropriate cleaning methods for different materials.</p><h2>Storage</h2><p>Store products in a cool, dry place away from direct sunlight when not in use.</p><h2>Handling</h2><p>Handle products with care to avoid damage. Follow any specific handling instructions provided.</p><h2>Maintenance</h2><p>Perform regular maintenance checks and address any issues promptly.</p><p>For product-specific care instructions, please refer to the product manual or contact our support team.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'featured' => false,
                'tags' => ['maintenance', 'tips'],
            ],
            [
                'title' => 'Upcoming Product Launches',
                'excerpt' => 'Get a sneak peek at the exciting new products coming soon to our store.',
                'content' => '<p>We have some exciting product launches planned for the coming months! Here\'s what to look forward to:</p><h2>New Product Line</h2><p>We are expanding our product range with innovative new items that we know you\'ll love.</p><h2>Seasonal Collection</h2><p>Our seasonal collection will feature products perfect for the upcoming season.</p><h2>Exclusive Deals</h2><p>Early bird customers will enjoy special discounts on new product launches.</p><p>Stay tuned to our blog and social media channels for announcements. We can\'t wait to share these new products with you!</p>',
                'status' => 'draft',
                'published_at' => null,
                'featured' => false,
                'tags' => ['announcement', 'new products'],
            ],
        ];

        foreach ($blogs as $blogData) {
            $blog = Blog::create([
                'title' => $blogData['title'],
                'excerpt' => $blogData['excerpt'],
                'content' => $blogData['content'],
                'status' => $blogData['status'],
                'published_at' => $blogData['published_at'],
                'featured' => $blogData['featured'],
                'tags' => $blogData['tags'],
                'author_id' => $admin->id,
                'views' => rand(10, 500),
            ]);

            // Add some comments to published blogs
            if ($blog->status === 'published' && rand(0, 1)) {
                for ($i = 0; $i < rand(1, 5); $i++) {
                    BlogComment::create([
                        'blog_id' => $blog->id,
                        'customer_name' => fake()->name(),
                        'customer_email' => fake()->safeEmail(),
                        'comment' => fake()->paragraph(),
                        'status' => rand(0, 1) ? 'approved' : 'pending',
                        'approved_at' => rand(0, 1) ? now() : null,
                        'approved_by' => rand(0, 1) ? $admin->id : null,
                    ]);
                }
            }
        }

        $this->command->info('Blog posts seeded successfully!');
    }
}
