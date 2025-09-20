<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Keyword extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * @return BelongsToMany<SupplierProfile>
     */
    public function supplierProfiles(): BelongsToMany
    {
        return $this->belongsToMany(SupplierProfile::class)->withTimestamps();
    }

    /**
     * @return BelongsToMany<BuyerRequest>
     */
    public function buyerRequests(): BelongsToMany
    {
        return $this->belongsToMany(BuyerRequest::class)->withTimestamps();
    }
}
