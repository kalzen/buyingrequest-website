<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan',
        'amount',
        'currency',
        'billing_cycle',
        'status',
        'paypal_subscription_id',
        'paypal_payer_id',
        'current_period_start',
        'current_period_end',
        'cancelled_at',
        'trial_ends_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'current_period_start' => 'datetime',
        'current_period_end' => 'datetime',
        'cancelled_at' => 'datetime',
        'trial_ends_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' 
            && $this->current_period_end 
            && $this->current_period_end->isFuture();
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isOnTrial(): bool
    {
        return $this->trial_ends_at && $this->trial_ends_at->isFuture();
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeForPlan($query, string $plan)
    {
        return $query->where('plan', $plan);
    }
}
