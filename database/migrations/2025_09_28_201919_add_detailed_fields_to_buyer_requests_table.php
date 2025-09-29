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
        Schema::table('buyer_requests', function (Blueprint $table) {
            // Goods Details
            $table->string('hs_code')->nullable()->after('unit');
            $table->text('quality_requirements')->nullable()->after('hs_code');
            $table->text('packaging_specification')->nullable()->after('quality_requirements');
            
            // Terms of Trade
            $table->string('terms_of_delivery')->nullable()->after('packaging_specification');
            $table->string('port_of_discharge')->nullable()->after('terms_of_delivery');
            $table->string('delivery_time')->nullable()->after('port_of_discharge');
            $table->string('method_of_transport')->nullable()->after('delivery_time');
            $table->string('payment_terms')->nullable()->after('method_of_transport');
            
            // Notes
            $table->text('notes')->nullable()->after('payment_terms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('buyer_requests', function (Blueprint $table) {
            $table->dropColumn([
                'hs_code',
                'quality_requirements',
                'packaging_specification',
                'terms_of_delivery',
                'port_of_discharge',
                'delivery_time',
                'method_of_transport',
                'payment_terms',
                'notes'
            ]);
        });
    }
};