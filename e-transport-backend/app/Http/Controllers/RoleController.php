<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return Role::all();
    }

    public function getClientRoles(){
        return Role::whereIn('role_id',[2, 3])->get();
    }

}
