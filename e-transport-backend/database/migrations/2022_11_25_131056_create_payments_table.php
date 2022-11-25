<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->foreignId('user_id');
            $table->foreignId('service_id');
            $table->string('status', 1000);
            $table->string('code', 1000);
            $table->string('request_id', 1000);
            $table->string('amount', 1000);
            $table->string('fee', 1000);
            $table->string('grossamount', 1000);
            $table->string('customername', 1000);
            $table->string('customeremail', 1000);
            $table->string('customermobile', 1000);
            $table->string('webhooksuccessurl', 1000);
            $table->string('webhookfailurl', 1000);
            $table->string('dateadded', 1000);
            $table->string('checkouturl', 1000);
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
        Schema::dropIfExists('payments');
    }
}
