<?php

namespace App\Http\Controllers;

use App\Models\LuggageConfig;
use App\Models\TransportBooking;
use App\Models\Payment;
use App\Models\BookingUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TransportBookingController extends Controller
{
    //
    public function store(Request $request){
        $validation = Validator::make(
            $request->all(),
            [
                // 'passenger_count' => ['required_unless:service_type,luggage'], //later
                // 'animals_count' => ['required_unless:service_type,luggage'], //later
                'pickup_time' => ['required'],
                'pickup_location' => ['required', 'max:1000'],
                'dropoff_location' => ['required', 'max:1000'],
                'service_type' => ['required'],
                'route' => ['required', Rule::in(['Manila to Marinduque', 'Marinduque to Manila'])]
            ],
            []

        );

        if($validation->fails()){
            return response([
                'errors' => $validation->errors()
            ], 422);
        }

        if(!$request->passenger_count && in_array('passenger', $request->service_type)){
            $validation->getMessageBag()->add('passenger_count', 'The passenger count is required.');
            return response([
                'errors' => $validation->errors()
            ], 422);
        }

        if(!$request->animal_count && in_array('animal', $request->service_type)){
            $validation->getMessageBag()->add('animal_count', 'The Animal count is required.');
            return response([
                'errors' => $validation->errors()
            ], 422);
        }

        if(!$request->user_customer_id || !$request->service_id){

        }

        if(in_array('luggage', $request->service_type) && !$request->small && !$request->medium && !$request->large && !$request->extra_large){
            return response([
                'message' => 'Please specify the the Luggage specification.'
            ], 400);
        }

        return \DB::transaction(function () use ($request) {
            $transport_booking = TransportBooking::create([
                'booking_status' => 'pending',
                'user_customer_id' => $request->user_customer_id,
                'service_id' => $request->service_id,
                'passenger_count' => $request->passenger_count ? $request->passenger_count : 0,
                'animal_count' => $request->animal_count ? $request->animal_count : 0,
                'pickup_time' => $request->pickup_time,
                'route' => $request->route,
                'pickup_location' => $request->pickup_location,
                'dropoff_location' => $request->dropoff_location,
                'service_type' => json_encode($request->service_type)
            ]);
    
            $transport_booking->refresh();
    
            BookingUpdate::create([
                'transport_booking_id' => $transport_booking->transport_booking_id,
                'booking_status' => "pending",
                'message' => "Transport booking has been submitted.",
                'msg_frm_customer' => null,
                'msg_frm_admin' => null
            ]);
    
            if(in_array('luggage', $request->service_type)){
                LuggageConfig::create([
                    'transport_booking_id' => $transport_booking->transport_booking_id,
                    'small' => $request->small,
                    'medium' => $request->medium,
                    'large' => $request->large,
                    'extra_large' => $request->extra_large,
                ]);
            }

            $transport_booking->user = $transport_booking->service->administrator->user;
            return $transport_booking;
        });

    }

    public function getByUserCustomerId($user_customer_id){
        return TransportBooking::where('user_customer_id', $user_customer_id)
        ->with([
            'luggageConfig',
            'payment',
            'service.administrator.user',
            'service.reviews',
            'bookingUpdates' => function($q){
                $q->orderBy('created_at', 'desc');
            }
        ])
        ->orderBy("updated_at", 'desc')
        ->get();
    }

    public function getByServiceId($service_id){
        return TransportBooking::where('service_id', $service_id)
        ->with([
            'luggageConfig',
            'service.administrator.user',
            'userCustomer',
            'payment',
            'bookingUpdates' => function($q){
                $q->orderBy('created_at', 'desc');
            }
        ])
        ->orderBy("updated_at", 'desc')
        ->get();
    }

    public function updateStatus(Request $request, $transport_booking_id){
        if(!$request->booking_status || !$request->message){
            return response([
                'message' => 'An invalid data was detected. Cannot process the request as of now.'
            ], 422);
        }

        return \DB::transaction(function () use ($request, $transport_booking_id) {
            $transport_booking = TransportBooking::where('transport_booking_id', $transport_booking_id);
            $booking = TransportBooking::where('transport_booking_id', $transport_booking_id)->with(['userCustomer'])->first();
            // return $booking->userCustomer;
            $transport_booking->update([
                'booking_status' => $request->booking_status
            ]);
            

            BookingUpdate::create([
                'transport_booking_id' => $transport_booking_id,
                'booking_status' => $request->booking_status,
                'message' => $request->message,
                'msg_frm_customer' => $request->msg_frm_customer ? $request->msg_frm_customer : null,
                'msg_frm_admin' => $request->msg_frm_admin ? $request->msg_frm_admin : null
            ]);

            if($request->booking_status == 'to pay'){
                $transport_booking->first()->generatePayment();
            }
            if($request->booking_status == 'finished'){
                Payment::where('transport_booking_id', $transport_booking->first()->transport_booking_id)->update([
                    'status' => 'paid'
                ]);
            }

            $transport_booking->with([
                'luggageConfig',
                'service.administrator.user',
                'userCustomer',
                'payment',
                'bookingUpdates' => function($q){
                    $q->orderBy('created_at', 'desc');
                }
            ]);
            return $transport_booking->first();
        });
    }

}
