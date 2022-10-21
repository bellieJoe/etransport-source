<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportBooking extends Model
{
    use HasFactory;

    // protected $with = ['bookingUpdates'];

    protected $primaryKey = 'transport_booking_id';

    protected $guarded = [];

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

}
