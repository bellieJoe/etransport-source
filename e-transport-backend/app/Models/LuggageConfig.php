<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LuggageConfig extends Model
{
    use HasFactory;

    protected $primaryKey = 'luggage_config_id';

    protected $guarded = [];

    public function transportBooking(){
        return $this->belongsTo(TransportBooking::class, 'transport_booking_id', 'transport_booking_id');
    }
}
