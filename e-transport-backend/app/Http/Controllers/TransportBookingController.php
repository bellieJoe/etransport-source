<?php

namespace App\Http\Controllers;

use App\Models\LuggageConfig;
use App\Models\TransportBooking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransportBookingController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'passenger_count' => ['required_unless:service_type,luggage'],
            'pickup_time' => ['required'],
            'pickup_location' => ['required', 'max:1000'],
            'dropoff_location' => ['required', 'max:1000'],
            'service_type' => ['required', Rule::in(['luggage', 'passenger', 'both'])],
            'route' => ['required', Rule::in(['Manila to Marinduque', 'Marinduque to Manila'])]
        ]);

        if(!$request->user_customer_id || !$request->service_id){

        }

        if($request->service_type != 'passenger' && !$request->small && !$request->medium && !$request->large && !$request->extra_large){
            return response([
                'message' => 'Please specify the the Luggage specification.'
            ], 400);
        }


        $transport_booking = TransportBooking::create([
            'booking_status' => 'pending',
            'user_customer_id' => $request->user_customer_id,
            'service_id' => $request->service_id,
            'passenger_count' => $request->passenger_count ? $request->passenger_count : 0,
            'pickup_time' => $request->pickup_time,
            'route' => $request->route,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'service_type' => $request->service_type
        ]);

        $transport_booking->refresh();

        if($request->service_type != 'passenger'){
            LuggageConfig::create([
                'transport_booking_id' => $transport_booking->transport_booking_id,
                'small' => $request->small,
                'medium' => $request->medium,
                'large' => $request->large,
                'extra_large' => $request->extra_large,
            ]);
        }
    }

    public function getByUserCustomerId($user_customer_id){
        return TransportBooking::where('user_customer_id', $user_customer_id)
        ->with([
            'luggageConfig',
            'service.administrator.user'
        ])->get();
    }
}
