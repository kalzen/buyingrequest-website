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
        Schema::create('supplier_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('buyer_request_id')->constrained()->onDelete('cascade');
            $table->text('message');
            $table->decimal('quoted_price', 15, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->integer('delivery_time_days')->nullable();
            $table->string('payment_terms')->nullable();
            $table->text('additional_notes')->nullable();
            $table->json('attachments')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected', 'negotiating', 'withdrawn'])->default('pending');
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_responses');
    }
};
