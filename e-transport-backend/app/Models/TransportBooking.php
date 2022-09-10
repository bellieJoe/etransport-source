<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportBooking extends Model
{
    use HasFactory;

    protected $primaryKey = 'transport_booking_id';

    protected $fillable = [
        'booking_status', 'user_customer_id', 'service_id', 'transport_booking_date'
    ];
}
