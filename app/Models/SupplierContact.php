<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'supplier_id',
        'buyer_request_id',
        'contact_type',
        'subject',
        'message',
        'status',
        'contacted_at',
        'replied_at',
    ];

    protected $casts = [
        'contacted_at' => 'datetime',
        'replied_at' => 'datetime',
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

    public function buyerRequest(): BelongsTo
    {
        return $this->belongsTo(BuyerRequest::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeReplied($query)
    {
        return $query->where('status', 'replied');
    }

    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }
}