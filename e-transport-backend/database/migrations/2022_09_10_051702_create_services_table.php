<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id('service_id');
            $table->foreignId('service_type_id');
            $table->foreignId('vehicle_type_id');
            $table->foreignId('administrator_id');
            $table->enum('service_status', ['open', 'close']);
            $table->string('driver', 1000);
            $table->string('license_number', 500);
            $table->string('plate_number', 500);
            $table->float('fare');
            $table->json('mode_of_payment');
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
        Schema::dropIfExists('services');
    }
}
