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
        Schema::create('success_stories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('category')->constrained('categories');
            $table->string('client_name');
            $table->string('date');
            $table->string('image');
            $table->text('outcome');
            $table->text('quote');
            $table->string('key_metric');
            $table->string('key_metric_label');
            $table->string('key_metric_icon')->default('Clock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('success_stories');
    }
};
