<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Models\Service;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    //
    public function getAdministratorByUserID($user_id){
        return Administrator::where([
            'user_id' => $user_id
        ])->first();
    }

    public function getServiceByUserId($user_id){
        $administrator = Administrator::where([
            'user_id' => $user_id
        ])->first();

        return $administrator->service;
    }
}