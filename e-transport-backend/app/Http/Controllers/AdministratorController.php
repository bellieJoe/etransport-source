<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    //
    public function getAdministratorByUserID($user_id){
        return Administrator::where([
            'user_id' => $user_id
        ])->first();
    }
}
