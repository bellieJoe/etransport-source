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
            $table->enum('booking_status', ['pending', 'accepted', 'canceled', 'finished', 'declined']);
            $table->foreignId('user_customer_id');
            $table->integer('passenger_count');
            $table->foreignId('service_id');
            $table->time('pickup_time');
            $table->enum('route', ['Manila to Marinduque', 'Marinduque to Manila']);
            $table->string('pickup_location', 1000);
            $table->string('dropoff_location', 1000);
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
