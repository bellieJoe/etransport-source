<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerificationResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('verification_responses', function (Blueprint $table) {
            $table->id('verification_response_id');
            $table->foreignId('verification_proof_id');
            $table->foreignId('response_role_id');
            $table->foreignId('user_main_administrator_id')->nullable();
            $table->string('message', 10000);
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
        Schema::dropIfExists('verification_responses');
    }
}
