<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Models\Service;
use App\Models\Payment;
use App\Models\TransportBooking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AdministratorController extends Controller
{
    //
    public function getAdministratorByUserID($user_id){
        return Administrator::where([
            'user_id' => $user_id
        ])->first();
    }

    public function getServiceByUserId($user_id){
        $administrator = Administrator::where([
            'user_id' => $user_id
        ])->first();

        return $administrator->service;
    }

    public function getReservationCountsByUser($user_id){
        $user = User::find($user_id);
        $service = $user->administrator->service;
        $all = TransportBooking::where([
            'service_id' => $service->service_id
        ])->count();
        $latestMonth = TransportBooking::where([
            'service_id' => $service->service_id
        ])
        ->whereMonth('updated_at', Carbon::now()->format('m'))
        ->whereYear('updated_at', Carbon::now()->format('Y'))
        ->count();
        $completed = TransportBooking::where([
            'service_id' => $service->service_id,
            'booking_status' => 'finished'
        ])
        ->whereMonth('updated_at', Carbon::now()->format('m'))
        ->whereYear('updated_at', Carbon::now()->format('Y'))
        ->count();;
        $canceledOrDeclined = TransportBooking::where([
            'service_id' => $service->service_id,
        ])
        ->whereIn('booking_status', ['declined', 'canceled'])
        ->whereMonth('updated_at', Carbon::now()->format('m'))
        ->whereYear('updated_at', Carbon::now()->format('Y'))
        ->count();
        return (object)[
            'all' => $all,
            'latestMonth' => $latestMonth,
            'completed' => $completed,
            'canceledOrDeclined' => $canceledOrDeclined
        ];
    }

    /* 
        Request
        month,  year
    */
    public function getIncomeReportByUser(Request $request, $user_id){
        $user = User::find($user_id);
        $service = $user->administrator->service;
        $bookings = TransportBooking::where([
            'service_id' => $service->service_id
        ])
        ->whereMonth('updated_at', $request->month)
        ->whereYear('updated_at', $request->year)
        ->pluck('transport_booking_id');

        $completedBookings = TransportBooking::where([
            'service_id' => $service->service_id,
            'booking_status' => 'finished'
        ])
        ->whereMonth('updated_at', $request->month)
        ->whereYear('updated_at', $request->year)
        ->pluck('transport_booking_id');

        $payments = Payment::whereIn('transport_booking_id', $completedBookings)->get();
        $totalIncome = 0;
        foreach ($payments as $p => $payment) {
            $data = json_decode($payment->payment_data);
            $breakdown = json_decode($payment->breakdown);
            if($payment->status == 'partially paid'){
                $totalIncome += $breakdown->total;
            }
        }
        return (object)[
            'totalIncome' => $totalIncome 
        ];
    }
}