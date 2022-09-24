<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LuggagePricing extends Model
{
    use HasFactory;

    protected $primaryKey = 'luggage_pricing_id';

    protected $guarded = [];

    public function service(){
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}
