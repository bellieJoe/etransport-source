<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class GlobalSettingsController extends Controller
{
    //
    public function index(){
        return json_decode(File::get(Storage::path('/private/global_settings.json')));
    }
}
