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
        Schema::create('supplier_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('supplier_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('buyer_request_id')->nullable()->constrained('buyer_requests')->onDelete('cascade');
            $table->enum('contact_type', ['inquiry', 'quote_request', 'follow_up', 'other'])->default('inquiry');
            $table->string('subject');
            $table->text('message');
            $table->enum('status', ['pending', 'replied', 'closed'])->default('pending');
            $table->timestamp('contacted_at');
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
            
            $table->index(['buyer_id', 'supplier_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_contacts');
    }
};
