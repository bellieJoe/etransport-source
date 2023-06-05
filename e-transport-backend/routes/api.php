<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\LuggagePricingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransportBookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\TermsAndConditionController;
use App\Http\Controllers\AnnouncementCommentController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RefundController;
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
    Route::post('update-profile/{user_id}', [UserController::class, 'updateProfile']);
    Route::get('{user_id}', [UserController::class, 'getUserByUserId']);
    Route::post('change-password', [UserController::class, 'changePassword']);
});

/* 
Emails
*/
Route::prefix('emails')->group(function () {
    Route::post('resend-verification-code/{user_id}', [UserController::class, 'resendVerificationCode'])->middleware(['throttle:email-resend']);
    Route::post('send-verification-code/{email}', [UserController::class, 'sendRecoveryCode']);
});

/* 
Administrators
*/
Route::prefix('administrators')->group(function () {
    Route::get('get-administrator-by-user-id/{user_id}', [AdministratorController::class, 'getAdministratorByUserID']);
    Route::get('get-service-by-user-id/{user_id}', [AdministratorController::class, 'getServiceByUserId']); 
    Route::get('get-reservation-counts-by-user/{user_id}', [AdministratorController::class, 'getReservationCountsByUser']);
    Route::get('get-income-report/{user_id}', [AdministratorController::class, 'getIncomeReportByUser']);
    Route::get('get-reviews/{user_id}', [AdministratorController::class, 'getReviewsByUser']);
});

/* 
Services
*/
Route::prefix('services')->group(function () {
    Route::post('', [ServiceController::class, 'store']);
    Route::get('', [ServiceController::class, 'getAll']);
    Route::get('get-service-by-user-id/{user_id}', [ServiceController::class, 'getServiceByUserID']);
    Route::put('{service_id}', [ServiceController::class, 'update']);
    Route::patch('set-status/{service_id}', [ServiceController::class, 'setStatus']);
    Route::delete('{service_id}', [ServiceController::class, 'destroy']);
    Route::get('listings/{user_customer_id}', [ServiceController::class, 'getListingsByUserCustomerId']);
    Route::get('get-service-by-service-key/{service_key}', [ServiceController::class, 'getServiceByServiceKey']);
    Route::post('transfer', [ServiceController::class, 'transfer']);
    Route::get('booking-transfers-request/{service_id}', [ServiceController::class, 'getBookingTransfersRequest']);
    Route::get('booking-transfers-by-service/{service_id}', [ServiceController::class, 'getBookingTransfersByService']);
    Route::put('accept-transfer/{transfered_booking_id}', [ServiceController::class, 'acceptTransfer']);
    Route::put('decline-transfer/{transfered_booking_id}', [ServiceController::class, 'declineTransfer']);
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
    Route::get('get-customer-schedule/{user_id}', [TransportBookingController::class, 'getCustomerSchedule']);
    Route::get('get-by-user-customer-id/{user_customer_id}', [TransportBookingController::class, 'getByUserCustomerId']);
    Route::get('get-by-service-id/{service_id}', [TransportBookingController::class, 'getByServiceId']);
    Route::post('update-status/{transport_booking_id}', [TransportBookingController::class, 'updateStatus']);
    Route::post('request-refund/{transport_booking_id}', [TransportBookingController::class, 'requestRefund']);
});

/* 
Reviews
*/
Route::prefix('reviews')->group(function(){
    Route::post('', [ReviewController::class, 'store']);
});

/* 
Announcements
*/
Route::prefix('announcements')->group(function(){
    Route::get('get-announcements-by-user-id/{user_id}', [AnnouncementController::class, 'getAnnouncementsByUserId']);
    Route::post('', [AnnouncementController::class, 'apiStore']);
    Route::put('{announcement}', [AnnouncementController::class, 'apiUpdate']);
    Route::delete('{announcement}', [AnnouncementController::class, 'apiDelete']);

    Route::prefix('comments')->group(function(){
        Route::post("", [AnnouncementCommentController::class, 'apiStore']);
    });
});

/* 
Terms and Conditions
*/
Route::prefix('terms-and-conditions')->group(function(){
    Route::post("agree/{user}", [TermsAndConditionController::class, 'agree']);
});

/* 
Messages
*/
Route::prefix('messages')->group(function(){
    Route::post("", [MessageController::class, 'store']);
    Route::get("get-messages-by-members", [MessageController::class, 'getMessagesByMembers']);
    Route::get("get-conversations-by-user-id/{user_id}", [MessageController::class, 'getConversationsByUserId']);
});


/* 
Notifications
*/
Route::prefix('notifications')->group(function(){
    Route::post('', [NotificationController::class, 'store']); 
    Route::get('/get-notifications-by-user-id/{user_id}', [NotificationController::class, 'getNotificationsByUserId']); 
});

/* 
Payments
*/
Route::group(['prefix' => 'payments', 'as' => 'payments.'], function(){
    Route::post('update', function(){})->name('update');
    Route::put('check-payment/{payment_id}', [PaymentController::class, 'checkPayment']);
    Route::get('get-payments-by-service-id/{service_id}', [PaymentController::class, 'getPaymentsByServiceId']);
    Route::get('get-payments-by-user-id/{user_id}', [PaymentController::class, 'getPaymentsByUserId']);
    Route::get('compute-income/{user_id}', [PaymentController::class, 'computeIncome']);
});

/* 
Refunds
*/
Route::group(['prefix' => 'refunds', 'as' => 'refunds.'], function(){
    Route::get('get-refunds-by-user-administrator-id/{user_id}', [RefundController::class, 'getRefundsByUserAdministratorId']);
    Route::get('get-refunds-by-user-customer-id/{user_id}', [RefundController::class, 'getRefundsByUserCustomerId']);
    Route::post('approve/{refund_id}', [RefundController::class, 'approveRefund']);
    Route::post('disapprove/{refund_id}', [RefundController::class, 'disapproveRefund']);
});

/* 
Global settingjson
*/
Route::group(['prefix' => 'global_settings', 'as' => 'global_settings.'], function(){
    Route::get('', [GlobalSettingsController::class, 'index']);
});


