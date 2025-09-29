<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class BuyerRequest extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'summary',
        'description',
        'quantity',
        'unit',
        'hs_code',
        'quality_requirements',
        'packaging_specification',
        'terms_of_delivery',
        'port_of_discharge',
        'delivery_time',
        'method_of_transport',
        'payment_terms',
        'budget_min',
        'budget_max',
        'currency',
        'preferred_location',
        'shipping_terms',
        'lead_valid_until',
        'status',
        'attachments',
        'notes',
        'views',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'attachments' => 'array',
        'lead_valid_until' => 'date',
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $request): void {
            if (empty($request->slug)) {
                $request->slug = Str::slug($request->title . '-' . Str::random(6));
            }
        });
    }

    /**
     * @return BelongsTo<User, BuyerRequest>
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return BelongsTo<Category, BuyerRequest>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsToMany<Keyword>
     */
    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(Keyword::class)->withTimestamps();
    }

    /**
     * @param  Builder<BuyerRequest>  $query
     * @return Builder<BuyerRequest>
     */
    public function scopeOpen(Builder $query): Builder
    {
        return $query->where('status', 'open');
    }
}
