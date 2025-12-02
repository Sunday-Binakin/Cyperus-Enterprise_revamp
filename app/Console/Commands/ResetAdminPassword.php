<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ResetAdminPassword extends Command
{
    protected $signature = 'admin:reset-password';
    protected $description = 'Reset admin password';

    public function handle()
    {
        $admin = User::where('email', 'admin@cyperus.com')->first();
        
        if ($admin) {
            $admin->password = Hash::make('password123');
            $admin->role = 'admin';
            $admin->save();
            
            $this->info('✅ Admin password reset successfully!');
            $this->info('Email: admin@cyperus.com');
            $this->info('Password: password123');
        } else {
            $this->error('Admin user not found!');
        }
    }
}

