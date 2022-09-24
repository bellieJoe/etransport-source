<?php

use App\Models\User;
use App\Models\Administrator;
use App\Models\Service;
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

    return User::factory()
    ->has(Administrator::factory()->has(Service::factory()))
    ->create();
});

