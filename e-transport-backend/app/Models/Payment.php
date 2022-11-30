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

    /* 
    Relationships
    */
    public function transportBooking(){
        return $this->belongsTo(TransportBooking::class,  'transport_booking_id', 'transport_booking_id');
    }
    public function user(){
        return $this->belongsTo(User::class,  'user_id', 'user_id');
    }
}
