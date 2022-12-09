<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

class CreateRefundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refunds', function (Blueprint $table) {
            $table->id('refund_id');
            $table->foreignId('payment_id');
            $table->enum('status', ['processing', 'succeeded', 'canceled', 'declined']);
            $table->enum('service_approval', ['approved', 'disapproved', 'pending']);
            $table->timestamp('expire_date')->default(Carbon::now()->addWeek());
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
        Schema::dropIfExists('refunds');
    }
}
