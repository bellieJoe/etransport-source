<?php

use App\Models\User;
use App\Models\Administrator;
use App\Models\Service;
use App\Models\LuggagePricing;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Faker\Factory;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return "Hey there!";
    // can be the code for generating admins
    $users = User::factory()->count(10)
    ->has(Administrator::factory()->has(Service::factory()->has(LuggagePricing::factory())))
    ->create();

    $users = $users->each(function($user){
        $user->update([
            'role_id' => 2
        ]);
        $user->refresh();
        return $user;
    });
    
    return $users;
});

