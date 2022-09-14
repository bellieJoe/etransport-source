<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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
});

Route::prefix('emails')->group(function () {

});