<?php

namespace App\Http\Controllers;

use App\Mail\VerificationEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Faker\Factory;

class UserController extends Controller
{
    private $faker = Factory::create();

    /**
     * login and authenticate the user
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['email', 'required'],
            'password' => ['required', 'min:8']
        ]);
        
        $user = User::where('email', $request->email);

        if(!$user->first() || !Hash::check($request->password, $user->first()->password)){
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $token = $user->first()->createToken('sampletoken')->plainTextToken;

        $data = $user->with(['role'])->first();
        $data->token = $token;

        return response($data, 200);
    }

    /**
     * Create a new user account
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:1000'],
            'username' => ['required', 'unique:users,username', 'max:1000'],
            'email' => ['required', 'unique:users,email'],
            'contact_number' => ['required', 'digits:10'],
            'password' => ['required', 'confirmed'],
            'role_id' => ['required', 'numeric', 'exists:roles,role_id']
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);

        // send verification email
        Mail::to($user)->send(new VerificationEmail($this->faker->randomNumber(6)));

        // generate token
        $user->token = $user->createToken('sampletoken')->plainTextToken;

        // return authenticated user instance
        return response($user, 200);
        
    }

 
}
