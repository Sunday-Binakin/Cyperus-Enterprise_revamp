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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('action'); // 'created', 'updated', 'deleted', 'restored', 'disabled', 'enabled'
            $table->string('model_type'); // Product, Category, Order, etc.
            $table->unsignedBigInteger('model_id');
            $table->text('description'); // Human-readable description
            $table->json('old_values')->nullable(); // Before update
            $table->json('new_values')->nullable(); // After update
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
            
            $table->index(['model_type', 'model_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
