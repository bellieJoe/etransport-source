<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class GlobalSettingsController extends Controller
{
    //
    public function index(){
        return json_decode(File::get(Storage::path('/private/global_settings.json')));
    }

    public function indexAdministrators(){
        $global_settings = json_decode(File::get(Storage::path('/private/global_settings.json')));
        return view('pages.preferences.index')
        ->with([
            'global_settings' => $global_settings
        ]);
    }

    public function updateAdministrators(Request $request){
        $request->validate([
            'passenger_price' => 'required|numeric|min:1',
            'animal_price' => 'required|numeric|min:1'
        ]);

        \DB::transaction(function () use ($request) {
            $global_settings = json_decode(File::get(Storage::path('/private/global_settings.json')));
            $global_settings->passenger_price = $request->passenger_price;
            $global_settings->animal_price = $request->animal_price;
            File::put(Storage::path('/private/global_settings.json'), json_encode($global_settings));
            Service::query()->update([
                'fare' => $request->passenger_price
            ]);
        });
        return redirect()->back();
    }
}
