<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class TransportBooking extends Model
{
    use HasFactory;

    // protected $with = ['bookingUpdates'];

    protected $primaryKey = 'transport_booking_id';

    protected $guarded = [];

    /* 
    Relationships
     */
    public function luggageConfig(){
        return $this->hasOne(LuggageConfig::class, 'transport_booking_id', 'transport_booking_id');
    }

    public function service(){
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }

    public function userCustomer(){
        return $this->belongsTo(User::class, 'user_customer_id', 'user_id');
    }

    public function bookingUpdates(){
        return $this->hasMany(BookingUpdate::class, 'transport_booking_id', 'transport_booking_id');
    }

    public function payment(){
        return $this->hasOne(Payment::class, 'transport_booking_id', 'transport_booking_id');
    }

    /* 
        Others
    */
    public function computeTotalFee(){

        $global_settings = json_decode(File::get(Storage::path('/global_settings.json')));

        $computation = [
            'total' => 0,
            'breakdown' => [
                'passenger' => 0,
                'animal' => 0,
                'luggage' => [
                    'small' => 0,
                    'medium' => 0,
                    'large' => 0,
                    'extra_large' => 0
                ]
            ]
        ];
        $transport_booking = TransportBooking::where('transport_booking_id', $this->transport_booking_id)->with('luggageConfig')->first();
        $luggage_config =  $transport_booking->luggageConfig;
        $luggage_pricing = LuggagePricing::where('service_id', $this->service_id)->first();
        if($this->passenger_count > 0){
            $computation['breakdown']['passenger'] = ($global_settings->passenger_price * $this->passenger_count);
            $computation['total'] += ($global_settings->passenger_price * $this->passenger_count);
        }
        if($this->animal_count > 0){
            $computation['breakdown']['animal'] = ($global_settings->animal_price * $this->animal_count);
            $computation['total'] += ($global_settings->animal_price * $this->animal_count);
        }
        if($luggage_config){
            if($luggage_config->small){
                $computation['breakdown']['luggage']['small'] = ($luggage_pricing->small * $luggage_config->small);
                $computation['total'] += ($luggage_pricing->small * $luggage_config->small);
            }
            if($luggage_config->medium){
                $computation['breakdown']['luggage']['medium'] = ($luggage_pricing->medium * $luggage_config->medium);
                $computation['total'] += ($luggage_pricing->medium * $luggage_config->medium);
            }
            if($luggage_config->large){
                $computation['breakdown']['luggage']['large'] = ($luggage_pricing->large * $luggage_config->large);
                $computation['total'] += ($luggage_pricing->large * $luggage_config->large);
            }
            if($luggage_config->extra_large){
                $computation['breakdown']['luggage']['extra_large'] = ($luggage_pricing->extra_large * $luggage_config->extra_large);
                $computation['total'] += ($luggage_pricing->extra_large * $luggage_config->extra_large);
            }
        }
        return $computation;
    }

    public function generatePayment(){
        $computed_fee = $this->computeTotalFee();
        $client = new \GuzzleHttp\Client();

        $downpayment_in_cents = (($computed_fee['total']/2)*100);
        $response = $client->request('POST', 'https://api.paymongo.com/v1/links', [
            'body' => '{"data":{"attributes":{"amount":'.$downpayment_in_cents.',"description":"Downpayment for Etransport Transport Booking"}}}',
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfdGVzdF9xTTdQTnJVN3REM0VxUXNrUldBc2FUeW06',
                'content-type' => 'application/json',
            ],
        ]);

        Payment::create([
            'user_id' => $this->user_customer_id,
            'transport_booking_id' => $this->transport_booking_id,
            'service_id' => $this->service_id,
            'status' => 'unpaid',
            'payment_data' => $response->getBody(),
            'breakdown' => json_encode($computed_fee)
        ]);
    }
}
