<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLuggageConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('luggage_configs', function (Blueprint $table) {
            $table->id('luggage_config_id');
            $table->foreignId('transport_booking_id');
            $table->integer('small')->nullable();
            $table->integer('medium')->nullable();
            $table->integer('large')->nullable();
            $table->integer('extra_large')->nullable();
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
        Schema::dropIfExists('luggage_configs');
    }
}
