<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportBooking extends Model
{
    use HasFactory;

    protected $primaryKey = 'transport_booking_id';

    protected $guarded = [];

    public function luggageConfigs(){
        return $this->hasMany(LuggageConfig::class, 'transport_booking_id', 'transport_booking_id');
    }
}
