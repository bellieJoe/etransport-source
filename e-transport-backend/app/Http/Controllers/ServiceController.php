<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
            'mode_of_payment' => ['required', 'max:255'],
            'load_type' => ['required'],
            'fare' => ['required']
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
            'mode_of_payment' => json_encode($request->mode_of_payment),
            'load_type' => $request->load_type,
            'fare' => $request->fare
        ]);
    }

    public function getServicesByUserID($user_id){
        $administrator = Administrator::where(['user_id' => $user_id])->first();

        $services = [];

        foreach (Service::where([
            'administrator_id' => $administrator->administrator_id
        ])->get() as $service) {
            $service->mode_of_payment = json_decode($service->mode_of_payment);
            array_push($services, $service);
        }
        
        return $services;
    }

    public function destroy($service_id){
        Service::find($service_id)->delete();
    }

    public function update(Request $request, $service_id){
        $request->validate([
            'driver' => ['required', 'max:1000'],
            'service_name' => ['required', 'max:1000'],
            'license_number' => ['required', 'max:500'],
            'plate_number' => ['required', 'max:500'],
            'vehicle_model' => ['required', 'max:5000'],
            'capacity' => ['required', 'max:5000'],
            'mode_of_payment' => ['required', 'max:255'],
            'load_type' => ['required'],
            'fare' => ['required']
        ]);

        $service = Service::find($service_id);

        $service->update([
            'driver' => $request->driver,
            'service_name' => $request->service_name,   
            'license_number' => $request->license_number,
            'plate_number' => $request->plate_number,
            'vehicle_model' => $request->vehicle_model,
            'capacity' => $request->capacity,
            'mode_of_payment' => json_encode($request->mode_of_payment),
            'load_type' => $request->load_type,
            'fare' => $request->fare
        ]);
    }

    public function setStatus(Request $request, $service_id){
        $request->validate([
            'service_status' => ['required']
        ]);

        $service = Service::find($service_id);

        $service->update([
            'service_status' => $request->service_status
        ]);

        $service->refresh();

        return $service;
    }
}
