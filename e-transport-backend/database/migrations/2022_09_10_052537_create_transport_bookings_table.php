<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transport_bookings', function (Blueprint $table) {
            $table->id('transport_booking_id');
            $table->enum('booking_status', ['pending', 'accepted', 'canceled', 'finished']);
            $table->foreignId('user_customer_id');
            $table->integer('passenger_count');
            $table->foreignId('service_id');
            $table->dateTime('pickup_datetime');
            $table->string('pickup_location');
            $table->string('dropoff_location');
            $table->enum('service_type', ['passenger', 'luggage', 'both']);
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
        Schema::dropIfExists('transport_bookings');
    }
}
