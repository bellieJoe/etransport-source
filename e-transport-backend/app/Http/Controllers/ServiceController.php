<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Administrator;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'user_id' => ['required'],
            'driver' => ['required', 'max:1000'],
            'service_name' => ['required', 'max:1000'],
            'license_number' => ['required', 'max:500'],
            'plate_number' => ['required', 'max:500'],
            'vehicle_model' => ['required', 'max:5000'],
            'capacity' => ['required', 'max:5000'],
            'mode_of_payment' => ['required', 'max:255']
        ]);

        $administrator = Administrator::where([
            'user_id' => $request->user_id
        ])->first();

        Service::create([   
            'administrator_id' => $administrator->administrator_id,
            'driver' => $request->driver,
            'service_name' => $request->service_name,   
            'license_number' => $request->license_number,
            'plate_number' => $request->plate_number,
            'vehicle_model' => $request->vehicle_model,
            'capacity' => $request->capacity,
            'mode_of_payment' => json_encode([$request->mode_of_payment])
        ]);

    }
}
