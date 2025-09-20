<?php

use App\Models\SupplierProfile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('supplier_profiles', 'slug')) {
            Schema::table('supplier_profiles', function (Blueprint $table) {
                $table->string('slug')->nullable()->after('company_name');
            });
        }

        SupplierProfile::withoutEvents(function () {
            SupplierProfile::query()->each(function (SupplierProfile $profile) {
                if (! $profile->slug) {
                    $profile->slug = Str::slug($profile->company_name).'-'.Str::random(4);
                    $profile->save();
                }
            });
        });

        Schema::table('supplier_profiles', function (Blueprint $table) {
            $table->string('slug')->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplier_profiles', function (Blueprint $table) {
            $table->dropUnique('supplier_profiles_slug_unique');
            $table->dropColumn('slug');
        });
    }
};
