<?php

namespace App\Http\Controllers;

use App\Mail\VerificationEmail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Faker\Factory;
use App\Models\Customer;
use App\Models\Administrator;

class UserController extends Controller
{


    /**
     * login and authenticate the user
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
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
        $faker = Factory::create();
        
        $request->validate([
            'name' => ['required', 'max:1000'],
            'username' => ['required', 'unique:users,username', 'max:1000'],
            'email' => ['required', 'unique:users,email', 'email'],
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
            'role_id' => $request->role_id,
            'verification_code' => $faker->randomNumber(6, true)
        ]);

        $user->refresh();
        $user->with(['role']);

        // create customer instance
        if($request->role_id == 3){
            Customer::create([
                'user_id' => $user->user_id
            ]);
        }

        // create administrator instance 
        if($request->role_id == 2){
            Administrator::create([
                'user_id' => $user->user_id
            ]);
        }

        // send verification email
        Mail::to($user)->send(new VerificationEmail($user->verification_code));

        // generate token
        $user->token = $user->createToken('sampletoken')->plainTextToken;

        // return authenticated user instance
        return response($user, 200);
        
    }

    public function isVerified($user_id){
        $user = User::find($user_id);

        return response([
            'email_verified_at' => $user->email_verified_at
        ],200);
    }

    public function resendVerificationCode($user_id){
        $faker = Factory::create();

        $user = User::find($user_id);

        $user->update([
            'verification_code' => $faker->randomNumber(6, true)
        ]);
        
        $user->refresh();

        Mail::to($user)->send(new VerificationEmail($user->verification_code));
    }

    public function verifyEmail(Request $request, $user_id) {
        $request->validate([
            'verification_code' => ['required']
        ]);

        $user = User::where('user_id',$user_id)->with(['role'])->first();

        if(!($user->verification_code === $request->verification_code)){
            return response([
                'message' => 'Verification Code doesnt match.'
            ], 400);
        }

        $user->update([
            'email_verified_at' => Carbon::now()
        ]);

        $user->refresh();

        return $user;
    }

 
}
