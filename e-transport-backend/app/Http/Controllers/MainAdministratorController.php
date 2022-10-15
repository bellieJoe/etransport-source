<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class MainAdministratorController extends Controller
{
    //
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8']
        ]);
        
        $user = User::where('email', $request->email);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect(route('home'));
        }
 
        return redirect()->back()->withInput()->withErrors([
            'invalid_credential' => 'Invalid Credentials'
        ]);

    }
}
