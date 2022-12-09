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
        // update the refund status 

        // update the payment_data in payments table
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
