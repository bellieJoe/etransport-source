<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;


    protected $with = ['luggagePricing'];

    protected $primaryKey = 'service_id';

    protected $guarded = [];

    public function administrator(){
        return $this->belongsTo(Administrator::class, 'administrator_id', 'administrator_id');
    }

    public function luggagePricing(){
        return $this->hasOne(LuggagePricing::class, 'service_id', 'service_id');
    }

    public function transportBookings(){
        return $this->hasMany(TransportBooking::class, 'service_id', 'service_id');
    }
}
