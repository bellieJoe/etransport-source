<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\GlobalSettingsController;
use App\Http\Controllers\PaymentController; 
use App\Http\Controllers\RefundController; 
use App\Models\User;
use App\Models\Administrator;
use App\Models\Service;
use App\Models\LuggagePricing;
use App\Models\TransportBooking;
use App\Models\Payment;
use App\Models\Refund;

use App\Http\Controllers\MainAdministratorController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Faker\Factory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
Route::get('testing', function(){
    return Carbon::now()->format('m Y');
});

Route::get('/', function () {
    return redirect(route('announcements.index'));
})->name('home')->middleware('auth');

Route::get('logout', function (Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::prefix('signin')->group(function () {
    Route::get('', function () {
        return view('pages.signin');
    })->name('login');

    Route::post('', [MainAdministratorController::class, 'login'])->name('signin');
});

Route::group(['prefix' => 'announcements','as' => 'announcements.'], function(){
    Route::get('', [AnnouncementController::class, 'index'])->name('index')->middleware('auth');
    Route::get('/{announcement}/edit', [AnnouncementController::class, 'edit'])->name('edit')->middleware('auth');
    Route::view('create', 'pages.announcements.create')->name('create')->middleware('auth');
    Route::post('', [AnnouncementController::class, 'store'])->name('store')->middleware('auth');
    Route::put('{announcement}/update', [AnnouncementController::class, 'update'])->name('update')->middleware('auth');
    Route::delete('{announcement}', [AnnouncementController::class, 'delete'])->name('delete')->middleware('auth');
});

/* 
administrators
*/
Route::group(['prefix' => 'terms_and_conditions', 'as' => 'terms_and_conditions.'], function(){
    Route::view('', 'pages.terms_and_conditions.terms_and_conditions');
});

/* 
Payments
*/
Route::group(['prefix' => 'payments', 'as' => 'payments.'], function(){
    Route::post('ok', [PaymentController::class, 'ok'])->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    Route::get('', [PaymentController::class, 'index'])->name('index')->middleware('auth');
    Route::group(['prefix' => 'refunds', 'as' => 'refunds.'], function(){
        Route::get('', [RefundController::class, 'index'])->name('index')->middleware('auth');
        Route::post('refund/{refund_id}', [RefundController::class, 'refund'])->name('refund')->middleware('auth');
        Route::post('decline-refund/{refund_id}', [RefundController::class, 'declineRefund'])->name('declineRefund')->middleware('auth');
    });
});

/* 
Users
*/
Route::group(['prefix' => 'users', 'as' => 'users.'], function(){
    Route::group(['prefix' => 'administrators', 'as' => 'administrators.'], function(){
        Route::get('', [UserController::class, 'indexAdministrators'])->name('index')->middleware('auth');
    });
    Route::group(['prefix' => 'passengers', 'as' => 'passengers.'], function(){
        Route::get('', [UserController::class, 'indexPassengers'])->name('index')->middleware('auth');
    });
});

/*
Preferences
*/
Route::group(['prefix' => 'preferences', 'as' => 'preferences.'], function(){
    Route::get('', [GlobalSettingsController::class, 'indexAdministrators'])->name('index')->middleware('auth');
    Route::put('update', [GlobalSettingsController::class, 'updateAdministrators'])->name('update')->middleware('auth');
});





