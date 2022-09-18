<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AdministratorController;
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


Route::get('token', function(){
    return "ok";
})->middleware('auth:sanctum');

Route::post('token', function(Request $request){
    $request->validate([
        'name' => 'required'
    ]);
    
    return "ok";
});

Route::prefix('roles')->group(function () {
    Route::resource('', RoleController::class)->only(['index']);

    Route::get('clients', [RoleController::class, 'getClientRoles']);
});

Route::prefix('users')->group(function () {
    Route::post('login', [UserController::class, 'login']);

    Route::post('signup', [UserController::class, 'signup']);

    Route::get('isVerified/{user_id}', [UserController::class, 'isVerified']);

    Route::post('verify-email/{user_id}', [UserController::class, 'verifyEmail']);
});

Route::prefix('emails')->group(function () {
    Route::post('resend-verification-code/{user_id}', [UserController::class, 'resendVerificationCode'])->middleware(['throttle:email-resend']);
});

Route::prefix('administrators')->group(function () {
    Route::get('get-administrator-by-user-id/{user_id}', [AdministratorController::class, 'getAdministratorByUserID']);
});

Route::prefix('services')->group(function () {
    Route::post('', [ServiceController::class, 'store']);

    Route::get('get-by-user-id/{user_id}', [ServiceController::class, 'getServicesByUserID']);

    Route::put('{service_id}', [ServiceController::class, 'update']);

    Route::patch('set-status/{service_id}', [ServiceController::class, 'setStatus']);

    Route::delete('{service_id}', [ServiceController::class, 'destroy']);
});