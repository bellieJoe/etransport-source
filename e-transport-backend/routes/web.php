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
Route::get('testing', function(){
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://g.payx.ph/payment_request',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => array(
        'x-public-key' => 'pk_4f953eb709ba3a04b95b50168030ddf4',
        'amount' => 200,
        'description' => 'Downpayment for Door to Door Booking.',
        'expiry' => 2169,
    ),
    ));

    $response = json_decode(curl_exec($curl));

    curl_close($curl);
    return $response;
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

Route::group(['prefix' => 'terms_and_conditions', 'as' => 'terms_and_conditions.'], function(){
    Route::view('', 'pages.terms_and_conditions.terms_and_conditions');
});





