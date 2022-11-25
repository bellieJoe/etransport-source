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

        return \DB::transaction(function () use ($request) {
            $transport_booking = TransportBooking::where('transport_booking_id', $transport_booking_id);
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

            if($request->booking_status == 'accepted'){
                $computed_fee = $transport_booking->computeTotalFee();
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
                    'amount' => $computed_fee->total,
                    'description' => 'Downpayment for Door to Door Booking.',
                    'expiry' => 2169,
                    'customername' =>  $transport_booking->userCustomer()->name,
                    'customermobile' => $transport_booking->userCustomer()->contact_number,
                    'customeremail' => $transport_booking->userCustomer()->email,
                    'webhooksuccessurl' => route('payments.update'),
                    'webhooksfailurl' => route('payments.update')
                ),
                ));

                $response = json_encode(curl_exec($curl));
                curl_close($curl);

                Payment::create([
                    'user_id' => $transport_booking->user_customer_id,
                    'service_id' => $transport_booking->servicec_id,
                    'status' => $response->status,
                    'code' => $response->code,
                    'request_id' => $response->request_id,
                    'amount' => $response->amount,
                    'fee' => $response->fee,
                    'grossamount' => $response->grossamount,
                    'customername' => $response->customername,
                    'customeremail' => $response->customeremail,
                    'customermobile' => $reponse->customermobile,
                    'webhooksuccessurl' => $response->webhooksuccessurl,
                    'webhookfailurl' => $response->webhookfailurl,
                    'dateadded' => $response->dateadded,
                    'checkouturl' => $reponse->checkouturl
                ])

            }

            $transport_booking->with([
                'luggageConfig',
                'service.administrator.user',
                'userCustomer',
                'bookingUpdates' => function($q){
                    $q->orderBy('created_at', 'desc');
                }
            ]);
            return $transport_booking->first();
        });
    }
}
