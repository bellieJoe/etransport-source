<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $primaryKey = 'payment_id';

    protected $guarded = [];

    protected $cast = [
        'payment_data' => 'array'
    ];

    public function paymentData(){
        return json_decode($this->payment_data);
    }

    public function refundPayment(){
        $payment = json_decode($this->payment_data)->data->attributes->payments[0];
        $amount = $payment->data->attributes->net_amount;

        // refund
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', 'https://api.paymongo.com/refunds', [
        'body' => '{"data":{"attributes":{"amount":'.$payment->data->attributes->net_amount.',"payment_id":"'.$payment->data->id.'","reason":"requested_by_customer"}}}',
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Basic c2tfdGVzdF9xTTdQTnJVN3REM0VxUXNrUldBc2FUeW06',
            'content-type' => 'application/json',
        ],
        ]);

        // update the payment_data in payments table
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://api.paymongo.com/v1/links/'.json_decode($this->payment_data)->data->id, [
        'headers' => [
            'accept' => 'application/json',
            'authorization' => 'Basic c2tfdGVzdF9xTTdQTnJVN3REM0VxUXNrUldBc2FUeW06',
        ],
        ]);
        $this->update([
            'payment_data' => $response->getBody()
        ]);
    }

    /* 
    Relationships
    */
    public function transportBooking(){
        return $this->belongsTo(TransportBooking::class,  'transport_booking_id', 'transport_booking_id');
    }

    public function service(){
        return $this->belongsTo(Service::class,  'service_id', 'service_id');
    }

    public function user(){
        return $this->belongsTo(User::class,  'user_id', 'user_id');
    }

    public function refunds(){
        return $this->hasMany(Refund::class, 'payment_id', 'payment_id');
    }
}
