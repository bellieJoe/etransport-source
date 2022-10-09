<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';

    protected $guarded = [];

    public function service(){
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }

    public function transportBooking(){
        return $this->belongsTo();
    }
}
