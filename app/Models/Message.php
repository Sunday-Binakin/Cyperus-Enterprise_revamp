<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    protected $fillable = [
        'type',
        'name',
        'email',
        'phone',
        'company',
        'subject',
        'message',
        'status',
        'read_at',
        'read_by',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    /**
     * Get the user who read this message
     */
    public function reader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'read_by');
    }

    /**
     * Scope for unread messages
     */
    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    /**
     * Scope for contact messages
     */
    public function scopeContact($query)
    {
        return $query->where('type', 'contact');
    }

    /**
     * Scope for distributor messages
     */
    public function scopeDistributor($query)
    {
        return $query->where('type', 'distributor');
    }

    /**
     * Scope for export department messages
     */
    public function scopeExport($query)
    {
        return $query->where('type', 'export');
    }

    /**
     * Mark message as read
     */
    public function markAsRead($userId = null)
    {
        $this->update([
            'status' => 'read',
            'read_at' => now(),
            'read_by' => $userId,
        ]);
    }
}
