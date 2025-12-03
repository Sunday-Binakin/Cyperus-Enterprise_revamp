<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Additional fields for distributor and export inquiries
            $table->json('additional_data')->nullable()->after('message');
            $table->string('country')->nullable()->after('company');
            $table->string('business_type')->nullable()->after('country');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn(['additional_data', 'country', 'business_type']);
        });
    }
};
