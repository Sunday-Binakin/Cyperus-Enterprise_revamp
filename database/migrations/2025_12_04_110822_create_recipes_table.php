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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('category'); // Beverages, Snacks, Breakfast, Desserts, Baking
            $table->string('prep_time');
            $table->string('cook_time')->nullable();
            $table->integer('servings');
            $table->enum('difficulty', ['Easy', 'Medium', 'Hard'])->default('Easy');
            $table->json('ingredients');
            $table->json('instructions');
            $table->json('tips')->nullable();
            $table->json('nutrition')->nullable(); // calories, protein, carbs, fat
            $table->boolean('is_active')->default(true);
            $table->boolean('featured')->default(false);
            $table->integer('views')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->noActionOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->noActionOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
