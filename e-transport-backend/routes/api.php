<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\LuggagePricingController;
use App\Http\Controllers\TransportBookingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



/* 
Roles
*/
Route::prefix('roles')->group(function () {
    Route::resource('', RoleController::class)->only(['index']);

    Route::get('clients', [RoleController::class, 'getClientRoles']);
});

/* 
Users
*/
Route::prefix('users')->group(function () {
    Route::post('login', [UserController::class, 'login']);

    Route::post('signup', [UserController::class, 'signup']);

    Route::get('isVerified/{user_id}', [UserController::class, 'isVerified']);

    Route::post('verify-email/{user_id}', [UserController::class, 'verifyEmail']);
});

/* 
Emails
*/
Route::prefix('emails')->group(function () {
    Route::post('resend-verification-code/{user_id}', [UserController::class, 'resendVerificationCode'])->middleware(['throttle:email-resend']);
});

/* 
Administrators
*/
Route::prefix('administrators')->group(function () {
    Route::get('get-administrator-by-user-id/{user_id}', [AdministratorController::class, 'getAdministratorByUserID']);

    Route::get('get-service-by-user-id/{user_id}', [AdministratorController::class, 'getServiceByUserId']);
});

/* 
Services
*/
Route::prefix('services')->group(function () {
    Route::post('', [ServiceController::class, 'store']);

    Route::get('get-service-by-user-id/{user_id}', [ServiceController::class, 'getServiceByUserID']);

    Route::put('{service_id}', [ServiceController::class, 'update']);

    Route::patch('set-status/{service_id}', [ServiceController::class, 'setStatus']);

    Route::delete('{service_id}', [ServiceController::class, 'destroy']);

    Route::get('listings', [ServiceController::class, 'getListings']);
});

/* 
LuggagePricings
*/
Route::prefix('luggage-pricings')->group(function () {
    Route::get('get-luggage-pricings-by-service-id/{service_id}', [LuggagePricingController::class, 'getLuggagePricingsByServiceId']);
});

/* 
TransportBookings
*/
Route::prefix('transport-bookings')->group(function (){
    Route::post('', [TransportBookingController::class, 'store']);
});
