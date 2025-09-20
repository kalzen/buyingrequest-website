<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('supplier_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('company_name');
            $table->string('headline')->nullable();
            $table->text('about')->nullable();
            $table->string('website_url')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('cover_image_url')->nullable();
            $table->string('location')->nullable();
            $table->json('countries_served')->nullable();
            $table->year('founded_year')->nullable();
            $table->unsignedInteger('min_order_quantity')->nullable();
            $table->decimal('min_order_value', 12, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->unsignedTinyInteger('lead_time_days')->nullable();
            $table->unsignedTinyInteger('response_time_hours')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->decimal('rating', 3, 2)->default(0);
            $table->json('certifications')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_profiles');
    }
};
