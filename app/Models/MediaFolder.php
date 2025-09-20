<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class MediaFolder extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'disk',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $folder): void {
            if (empty($folder->slug)) {
                $folder->slug = Str::slug($folder->name . '-' . Str::random(6));
            }
        });
    }

    /**
     * @return BelongsTo<MediaFolder, MediaFolder>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * @return HasMany<MediaFolder>
     */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * @return HasMany<MediaFile>
     */
    public function files(): HasMany
    {
        return $this->hasMany(MediaFile::class, 'folder_id');
    }
}
