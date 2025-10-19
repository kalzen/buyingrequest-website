<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class SupplierProfile extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'company_name',
        'slug',
        'headline',
        'about',
        'website_url',
        'logo_url',
        'cover_image_url',
        'location',
        'countries_served',
        'founded_year',
        'min_order_quantity',
        'min_order_value',
        'currency',
        'lead_time_days',
        'response_time_hours',
        'is_verified',
        'is_featured',
        'rating',
        'certifications',
        'social_links',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'countries_served' => 'array',
        'certifications' => 'array',
        'social_links' => 'array',
        'is_verified' => 'boolean',
        'is_featured' => 'boolean',
        'rating' => 'float',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $profile): void {
            if (empty($profile->slug)) {
                $base = Str::slug($profile->company_name);
                $slug = $base;
                $suffix = 1;

                while (self::where('slug', $slug)->whereKeyNot($profile->id)->exists()) {
                    $slug = $base.'-'.Str::random(4 + $suffix);
                    $suffix++;
                }

                $profile->slug = $slug;
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * @return BelongsTo<User, SupplierProfile>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany<Category>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    /**
     * @return BelongsToMany<Keyword>
     */
    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(Keyword::class)->withTimestamps();
    }

    /**
     * @return HasMany<ProfileView>
     */
    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class, 'supplier_id', 'user_id');
    }

    /**
     * Get total profile views count
     */
    public function getTotalViewsAttribute(): int
    {
        return $this->profileViews()->count();
    }

    /**
     * Get views for a specific period
     */
    public function getViewsForPeriod(string $period = '30 days'): int
    {
        return $this->profileViews()
            ->where('viewed_at', '>=', now()->sub($period))
            ->count();
    }

    /**
     * @param  Builder<SupplierProfile>  $query
     * @return Builder<SupplierProfile>
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
}
