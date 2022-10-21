<?php

use App\Http\Controllers\AnnouncementController;
use App\Models\User;
use App\Models\Administrator;
use App\Models\Service;
use App\Models\LuggagePricing;
use App\Models\TransportBooking;

use App\Http\Controllers\MainAdministratorController;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Faker\Factory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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

    Route::view('create', 'pages.announcements.create')->name('create')->middleware('auth');

    Route::post('', [AnnouncementController::class, 'store'])->name('store')->middleware('auth');

});





