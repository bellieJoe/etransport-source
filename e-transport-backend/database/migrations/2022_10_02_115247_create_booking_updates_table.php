<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_updates', function (Blueprint $table) {
            $table->id('booking_update_id');
            $table->foreignId('transport_booking_id');
            $table->enum('booking_status', ['pending', 'accepted', 'canceled', 'finished', 'declined']);
            $table->string('message', 5000);
            $table->string('msg_frm_customer', 5000)->nullable();
            $table->string('msg_frm_admin', 5000)->nullable();
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
        Schema::dropIfExists('booking_updates');
    }
}
