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
    return response([], 404);
});

