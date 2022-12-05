<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use App\Models\TransportBooking;
use App\Models\BookingUpdate;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public $basicAuthKey = 'c2tfdGVzdF9xTTdQTnJVN3REM0VxUXNrUldBc2FUeW06';
    //
    public function ok(Request $request){
        Payment::find(3)->update([
            'payment_data' => json_encode($request)
        ]);
     
    }

    public function checkPayment($payment_id){
        $payment = Payment::find($payment_id);
        $payment->payment_data = json_decode($payment->payment_data);

        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.paymongo.com/v1/links/'.$payment->payment_data->data->id, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfdGVzdF9xTTdQTnJVN3REM0VxUXNrUldBc2FUeW06',
            ],
        ]);
        
        return \DB::transaction(function () use($payment, $response) {
            $payment->update([
                'payment_data' => $response->getBody(),
                'status' => 'partially paid'
            ]);
            $transport_booking = TransportBooking::find($payment->transport_booking_id);
            $transport_booking->update([
                'booking_status' => 'accepted'
            ]);
            BookingUpdate::create([
                'transport_booking_id' => $transport_booking->transport_booking_id,
                'booking_status' => 'accepted',
                'message' => 'The Customer has paid the initial payment for this transport booking'
            ]);
            if(json_decode($response->getBody())->data->attributes->status == 'unpaid'){
                
                return response([
                    'message' => 'Payment is still unpaid'
                ], 419);
            }
            return TransportBooking::where('transport_booking_id', $payment->transport_booking_id)->with([
                'luggageConfig',
                'service.administrator.user',
                'userCustomer',
                'payment',
                'bookingUpdates' => function($q){
                    $q->orderBy('created_at', 'desc');
                }
            ])->first();
        });

        
    }

    public function getPaymentsByServiceId( $service_id, Request $request ){
        $data = [
            'service_id' => $service_id
        ];
        if($request->status != 'all'){
            $data['status'] = $request->status;
        }

        return Payment::where($data)
        ->orderBy('updated_at', 'desc')
        ->with([
            'transportBooking',
            'user'
        ])
        ->paginate(10);
    }

    public function getPaymentsByUserId($user_id, Request $request ){
        $data = [
            'user_id' => $user_id
        ];
        if($request->status != 'all'){
            $data['status'] = $request->status;
        }

        return Payment::where($data)
        ->orderBy('updated_at', 'desc')
        ->with([
            'transportBooking',
            'user'
        ])
        ->paginate(20);
    }

    public function index(Request $request){
        $payment_query = Payment::query();
        $filter = [];
        if($request->name){
            $userIds = User::where('name', 'like', '%'.$request->name.'%')->pluck('user_id');
            $payment_query->whereIn('user_id', $userIds);
        }
        if($request->status){
            $payment_query->where('status', $request->status);
        }
        return view('pages.payments.index')->with([
            'payments' => $payment_query->paginate(15)
        ]);
    }
}
