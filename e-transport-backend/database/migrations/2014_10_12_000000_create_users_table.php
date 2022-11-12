<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username', 1000)->unique();
            $table->string('email')->unique();
            $table->string('contact_number', 10);
            $table->string('name', 1000);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('role_id');
            $table->string('verification_code')->nullable();
            $table->enum('terms_and_condition', [0,1])->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
