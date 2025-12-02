<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Check if admin user already exists
        $admin = User::where('email', 'admin@cyperus.com')->first();

        if (!$admin) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@cyperus.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);

            $this->command->info('Admin user created successfully!');
            $this->command->info('Email: admin@cyperus.com');
            $this->command->info('Password: password123');
        } else {
            // Update existing user to admin
            $admin->update(['role' => 'admin']);
            $this->command->info('User updated to admin role!');
            $this->command->info('Email: admin@cyperus.com');
        }
    }
}

