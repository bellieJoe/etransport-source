<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    public $review_summary = "ok oke";
    public $passenger_booking_count = 0;

    protected $with = ['luggagePricing'];

    protected $primaryKey = 'service_id';

    protected $guarded = [];

    protected $appends = [
        'review_summary',
        'passenger_booking_count'
    ];

    protected $casts = [
        'marinduque_departure_datetime' => 'datetime:Y-m-d H:i:s',
        'manila_departure_datetime' => 'datetime:Y-m-d H:i:s',
    ];

    // accessors
    public function getReviewSummaryAttribute(){
        $reviews = $this->reviews;
        $review_summary = [
            'average_ratings' => 0,
            'total_ratings' => 0
        ];
        foreach($reviews as $review){
            $review_summary['average_ratings'] += $review->rate;
            $review_summary['total_ratings']++;
        }
        if($review_summary['total_ratings'] > 0){
            $review_summary['average_ratings'] /= $review_summary['total_ratings'];
        }
        return (object)$review_summary;
    }

    public function getPassengerBookingCountAttribute(){
        $passenger_count = 0;
        $bookings = TransportBooking::where([
            'service_id' => $this->service_id,
            'booking_status' => 'accepted',
            ['passenger_count', '>', 0]
        ])->get();
        foreach ($bookings as $key => $item) {
            $passenger_count += $item->passenger_count;
        }
        return $passenger_count;
    }


    // relationships
    public function administrator(){
        return $this->belongsTo(Administrator::class, 'administrator_id', 'administrator_id');
    }

    public function luggagePricing(){
        return $this->hasOne(LuggagePricing::class, 'service_id', 'service_id');
    }

    public function transportBookings(){
        return $this->hasMany(TransportBooking::class, 'service_id', 'service_id');
    }

    public function reviews(){
        return $this->hasMany(Review::class, 'service_id', 'service_id');
    }

    public function payments(){
        return $this->hasMany(Payment::class, 'service_id', 'service_id');
    }


}
