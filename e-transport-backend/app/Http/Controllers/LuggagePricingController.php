<?php

namespace App\Http\Controllers;

use App\Models\LuggagePricing;

use Illuminate\Http\Request;

class LuggagePricingController extends Controller
{
    public function getLuggagePricingsByServiceId($service_id){
        return LuggagePricing::where('service_id', $service_id)->get();
    }
}
