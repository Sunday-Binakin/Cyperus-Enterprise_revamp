<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'image',
        'category',
        'prep_time',
        'cook_time',
        'servings',
        'difficulty',
        'ingredients',
        'instructions',
        'tips',
        'nutrition',
        'is_active',
        'featured',
        'views',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'ingredients' => 'array',
            'instructions' => 'array',
            'tips' => 'array',
            'nutrition' => 'array',
            'is_active' => 'boolean',
            'featured' => 'boolean',
            'views' => 'integer',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($recipe) {
            $recipe->created_by = auth()->id();
        });

        static::updating(function ($recipe) {
            $recipe->updated_by = auth()->id();
        });
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function incrementViews(): void
    {
        $this->increment('views');
    }
}
