<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    public const ROLE_BUYER = 'buyer';
    public const ROLE_SUPPLIER = 'supplier';
    public const ROLE_ADMIN = 'admin';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string',
        ];
    }

    /**
     * @return HasOne<SupplierProfile>
     */
    public function supplierProfile(): HasOne
    {
        return $this->hasOne(SupplierProfile::class);
    }

    /**
     * @return HasMany<BuyerRequest>
     */
    public function buyerRequests(): HasMany
    {
        return $this->hasMany(BuyerRequest::class);
    }

    /**
     * @return HasMany<SupplierContact>
     */
    public function supplierContacts(): HasMany
    {
        return $this->hasMany(SupplierContact::class, 'buyer_id');
    }

    /**
     * @return HasMany<SupplierContact>
     */
    public function buyerContacts(): HasMany
    {
        return $this->hasMany(SupplierContact::class, 'supplier_id');
    }

    /**
     * @return HasMany<Order>
     */
    public function ordersAsBuyer(): HasMany
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    /**
     * @return HasMany<Order>
     */
    public function ordersAsSupplier(): HasMany
    {
        return $this->hasMany(Order::class, 'supplier_id');
    }

    public function isSupplier(): bool
    {
        return $this->role === self::ROLE_SUPPLIER;
    }

    public function isBuyer(): bool
    {
        return $this->role === self::ROLE_BUYER;
    }
}
