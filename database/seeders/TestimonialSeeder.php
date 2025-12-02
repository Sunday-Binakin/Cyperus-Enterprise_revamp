<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            $this->command->warn('No admin user found. Skipping testimonial seeding.');
            return;
        }

        $testimonials = [
            [
                'name' => 'Chef Kwame Asante',
                'title' => 'Executive Chef',
                'company' => 'Five Star Hotel',
                'content' => 'Tigernut flour has become my secret ingredient. The nutty flavor and texture it brings to our pastries is absolutely incredible.',
                'image' => 'uploads/testimonials/chef-kwame.jpg',
                'is_active' => true,
                'sort_order' => 1,
                'created_by' => $admin->id,
            ],
            [
                'name' => 'Sarah Johnson',
                'title' => 'Nutritionist',
                'company' => 'Wellness Center',
                'content' => 'I recommend tigernut products to all my clients. They are nutrient-dense and perfect for those with nut allergies.',
                'image' => 'uploads/testimonials/sarah-johnson.jpg',
                'is_active' => true,
                'sort_order' => 2,
                'created_by' => $admin->id,
            ],
            [
                'name' => 'Dr. Michael Brown',
                'title' => 'Pediatrician',
                'company' => 'Children\'s Hospital',
                'content' => 'These products are fantastic for children. Natural, healthy, and they actually love the taste!',
                'image' => 'uploads/testimonials/dr-michael.jpg',
                'is_active' => true,
                'sort_order' => 3,
                'created_by' => $admin->id,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::firstOrCreate(
                ['name' => $testimonial['name'], 'company' => $testimonial['company']],
                $testimonial
            );
        }

        $this->command->info('✅ Testimonials seeded successfully!');
    }
}
