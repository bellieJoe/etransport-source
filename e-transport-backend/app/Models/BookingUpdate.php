<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingUpdate extends Model
{
    use HasFactory;

    protected $primaryKey = 'booking_update_id';

    protected $guarded = [];

    function transportBooking(){
        return $this->belongsTo(TransportBooking::class, 'transport_booking_id', 'transport_booking_id');
    }
}
