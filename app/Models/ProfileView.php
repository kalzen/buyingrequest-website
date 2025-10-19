<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileView extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'viewer_id',
        'viewer_ip',
        'viewer_user_agent',
        'referrer',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

    public function viewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'viewer_id');
    }

    /**
     * Record a profile view
     */
    public static function recordView(int $supplierId, ?int $viewerId = null, ?string $ip = null, ?string $userAgent = null, ?string $referrer = null): void
    {
        self::create([
            'supplier_id' => $supplierId,
            'viewer_id' => $viewerId,
            'viewer_ip' => $ip,
            'viewer_user_agent' => $userAgent,
            'referrer' => $referrer,
            'viewed_at' => now(),
        ]);
    }
}
