<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferedBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfered_bookings', function (Blueprint $table) {
            $table->id('transfered_booking_id');
            $table->foreignId('transport_booking_id');
            $table->foreignId('service_id');
            $table->foreignId('from_service_id');
            $table->enum('status', ['accepted', 'declined', 'pending']);
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
        Schema::dropIfExists('transfered_bookings');
    }
}
