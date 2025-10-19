<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'buyer_request_id',
        'message',
        'quoted_price',
        'currency',
        'delivery_time_days',
        'payment_terms',
        'additional_notes',
        'attachments',
        'status',
        'responded_at',
    ];

    protected $casts = [
        'attachments' => 'array',
        'quoted_price' => 'decimal:2',
        'responded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

    public function buyerRequest(): BelongsTo
    {
        return $this->belongsTo(BuyerRequest::class);
    }
}
