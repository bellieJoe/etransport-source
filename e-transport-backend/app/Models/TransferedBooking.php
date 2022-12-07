<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferedBooking extends Model
{
    use HasFactory;
    protected $primaryKey = 'transfered_booking_id';

    protected $guarded = [];

    /* 
    Relationships
    */
    public function transportBooking(){
        return $this->hasOne(TransportBooking::class, 'transport_booking_id', 'transport_booking_id');
    }
}
