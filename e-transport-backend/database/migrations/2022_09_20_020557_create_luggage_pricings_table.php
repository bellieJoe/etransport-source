<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLuggagePricingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('luggage_pricings', function (Blueprint $table) {
            $table->id('luggage_pricing_id');
            $table->foreignId('service_id');
            $table->float('small')->nullable();
            $table->float('medium')->nullable();
            $table->float('large')->nullable();
            $table->float('extra_large')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('luggage_pricings');
    }
}
