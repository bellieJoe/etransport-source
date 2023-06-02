<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Administrator;
use App\Models\LuggagePricing;
use App\Models\TransferedBooking;
use App\Models\TransportBooking;
use App\Rules\DepartureDate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function getAll(){
        return Service::query()->with([
            'administrator.user'
        ])->get();
    }

    public function store(Request $request){
        
        $rules = [
            'user_id' => ['required'],
            'driver' => ['required', 'max:1000'],
            'service_name' => ['required', 'max:1000'],
            'license_number' => ['required', 'max:500'],
            'plate_number' => ['required', 'max:500'],
            'vehicle_model' => ['required'],
            'capacity' => ['required', 'numeric'],
            'gcash_account' => ['required', 'max:10', 'min:10'],
            'service_type' => ['required'],
            // 'small' => ['required_if:service_type,both,luggage'],
            // 'medium' => ['required_if:service_type,both,luggage'],
            // 'large' => ['required_if:service_type,both,luggage'],
            // 'extra_large' => ['required_if:service_type,both,luggage']
        ];
        $global_settings = json_decode(File::get(Storage::path('/global_settings.json')));
        
        if(isset($request->service_type) && in_array('luggage', $request->service_type)){
            $rules['small'] = ['required'];
            $rules['medium'] = ['required'];
            $rules['large'] = ['required'];
            $rules['extra_large'] = ['required'];
        }
        
        $request->validate($rules);

        $administrator = Administrator::where([
            'user_id' => $request->user_id
        ])->first();

        \DB::transaction(function () use($administrator, $request, $global_settings) {
            $service = Service::create([   
                'administrator_id' => $administrator->administrator_id,
                'sid' => 'service_'.Str::random(30).'_'.time(),
                'driver' => $request->driver,
                'service_name' => $request->service_name,   
                'license_number' => $request->license_number,
                'plate_number' => $request->plate_number,
                'vehicle_model' => $request->vehicle_model,
                'capacity' => $request->capacity,
                'fare' => $global_settings->passenger_price,
                // 'mode_of_payment' => json_encode($request->mode_of_payment),
                'gcash_account' => $request->gcash_account,
                'service_status' => 'close',
                'service_type' => json_encode($request->service_type)
            ]);
    
            $service->refresh();
    
            LuggagePricing::create([
                'service_id' => $service->service_id,
                'small' => $request->small ? $request->small : null ,
                'medium' => $request->medium ? $request->medium : null ,
                'large' => $request->large ? $request->large : null ,
                'extra_large' => $request->extra_large ? $request->extra_large : null
            ]);
        });
        
    }

    public function getServiceByUserID($user_id){
        $administrator = Administrator::where(['user_id' => $user_id])->first();

        $service = Service::where([
            'administrator_id' => $administrator->administrator_id
        ])
        ->orderBy('updated_at', 'desc')
        ->with('luggagePricing')
        ->first();

        $service->mode_of_payment = json_decode($service->mode_of_payment);

        return $service;
    }

    public function destroy($service_id){
        Service::find($service_id)->delete();
    }

    public function getSetviceByServiceId($service_id){
        $service = Service::where('service_id', $service_id)->with('luggagePricing')->first();
        $service->mode_of_payment = json_decode($service->mode_of_payment);
        return $service;
    }

    public function update(Request $request, $service_id){
        $request->validate([
            'driver' => ['required', 'max:1000'],
            'service_name' => ['required', 'max:1000'],
            'license_number' => ['required', 'max:500'],
            'plate_number' => ['required', 'max:500'],
            'vehicle_model' => ['required'],
            'capacity' => ['required'],
            // 'mode_of_payment' => ['required'],
            'service_type' => ['required'],
            'small' => ['required_if:service_type,both,luggage'],
            'medium' => ['required_if:service_type,both,luggage'],
            'large' => ['required_if:service_type,both,luggage'],
            'extra_large' => ['required_if:service_type,both,luggage']
        ]);

        $service = Service::find($service_id);

        $service->update([
            'driver' => $request->driver,
            'service_name' => $request->service_name,   
            'license_number' => $request->license_number,
            'plate_number' => $request->plate_number,
            'vehicle_model' => $request->vehicle_model,
            'capacity' => $request->capacity,
            // 'mode_of_payment' => json_encode($request->mode_of_payment),
            'service_type' => $request->service_type
        ]);

        LuggagePricing::where([
            'service_id' => $service_id
        ])
        ->update([
            'small' => $request->small ? $request->small : null ,
            'medium' => $request->medium ? $request->medium : null ,
            'large' => $request->large ? $request->large : null ,
            'extra_large' => $request->extra_large ? $request->extra_large : null
        ]);

        return $this->getSetviceByServiceId($service_id);
    }

    public function setStatus(Request $request, $service_id){
        $request->validate([
            'service_status' => ['required', 'in:open,close'],
            'marinduque_departure_datetime' => [new DepartureDate(), ($request->marinduque_departure_datetime ? 'after:tomorrow' : null)],
            'manila_departure_datetime' => [new DepartureDate(), ($request->manila_departure_datetime ? 'after:tomorrow' : null)]
        ]);

        $service = Service::find($service_id);

        $service->update([
            'service_status' => $request->service_status,
            'marinduque_departure_datetime' => $request->service_status == 'open' ? $request->marinduque_departure_datetime : null,
            'manila_departure_datetime' => $request->service_status == 'open' ? $request->manila_departure_datetime : null
        ]);

        $service->refresh();

        $service->mode_of_payment = json_decode($service->mode_of_payment);

        return $service;
    }

    public function getListingsByUserCustomerId($user_customer_id){
        $user_can_book_ids = TransportBooking::where([
            'user_customer_id' => $user_customer_id 
        ])
        ->whereIn('booking_status', ['pending', 'accepted', 'to pay'])
        ->pluck('service_id');

        $services =  Service::where([
            'service_status' => 'open'
        ])
        ->whereNotIn('service_id', $user_can_book_ids)
        ->with(['administrator', 'luggagePricing', 'reviews'])
        ->get();

        return $services;
    }

    public function getServiceByServiceKey($service_key){
        return Service::where('sid', $service_key)->with('administrator.user')->first();
    }

    public function transfer(Request $request){
        \DB::transaction(function () use($request) {
            TransferedBooking::create([
                'transport_booking_id' => $request->transport_booking_id,
                'service_id' => $request->service_id,
                'from_service_id' => $request->from_service_id,
                'status' => 'pending'
            ]);
            // TransportBooking::where('transport_booking_id', $request->transport_booking_id)
            // ->update([
            //     'service_id' => $request->service_id
            // ]);
        });
    }

    public function acceptTransfer($transfered_booking_id){
        \DB::transaction(function () use($transfered_booking_id) {
            $transfered_booking = TransferedBooking::find($transfered_booking_id);
            $transfered_booking->update([
                'status' => 'accepted'
            ]);
            TransportBooking::where('transport_booking_id', $transfered_booking->transport_booking_id)
            ->update([
                'service_id' => $transfered_booking->service_id
            ]);
        });
    }

    public function declineTransfer($transfered_booking_id){
        \DB::transaction(function () use($transfered_booking_id) {
            $transfered_booking = TransferedBooking::find($transfered_booking_id);
            $transfered_booking->update([
                'status' => 'declined'
            ]);
        });
    }

    public function getBookingTransfersRequest($service_id){
        return TransferedBooking::where('service_id', $service_id)->with(['transportBooking.userCustomer', 'transportBooking.service', 'service', 'fromService.administrator'])->orderBy('updated_at', 'desc')->get();
    }

    public function getBookingTransfersByService($service_id){
        return TransferedBooking::where('from_service_id', $service_id)->with(['transportBooking.userCustomer', 'transportBooking.service', 'service', 'fromService.administrator'])->orderBy('updated_at', 'desc')->get();
    }
}
