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
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8']
        ]);
        
        $user = User::where('email', $request->email);

        if(!$user->first() || !Hash::check($request->password, $user->first()->password)){
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $token = $user->first()->createToken('sampletoken')->plainTextToken;

        $data = $user->with(['role', 'reviews'])->first();
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

        return \DB::transaction(function () use ($request, $faker) {
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
            $user->with(['role', 'reviews']);
    
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
        });

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

    public function updateProfile(Request $request, $user_id){
        $user = User::where('user_id', $user_id);

        $request->validate([
            'name' => ['required', 'max:1000'],
            'username' => ['required', $user->first()->username == $request->username ? null : 'unique:users,username', 'max:1000'],
            'contact_number' => ['required', 'digits:10'],
        ]);

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'contact_number' => $request->contact_number
        ]);

        // $user->refresh();
        
        return $user->with(['role'])->first();
    }

    public function getUserByUserId($user_id){
        return User::find($user_id);
    }

    public function indexAdministrators(Request $request){
        if($request->search){
            return view('pages.users.index')->with([
                'users' => User::where('role_id', 2)
                ->where('name', 'like', '%'.$request->search.'%')
                ->paginate(15),
                'title' => 'Administrators'
            ]);
        }
        return view('pages.users.index')->with([
            'users' => User::where('role_id', 2)->paginate(15),
            'title' => 'Administrators'
        ]);
    }

    public function indexPassengers(Request $request){
        if($request->search){
            return view('pages.users.index')->with([
                'users' => User::where('role_id', 3)
                ->where('name', 'like', '%'.$request->search.'%')
                ->paginate(15),
                'title' => 'Passengers'
            ]);
        }
        return view('pages.users.index')->with([
            'users' => User::where('role_id', 3)->paginate(15),
            'title' => 'Passengers'
        ]);
    }

    public function sendRecoveryCode($email){
        $faker = Factory::create();

        $user = User::where('email', $email)->first();

        if(!$user){
          return response([
            'message' => "Can't find a user with email " . $email
          ], 400);
        }

        $user->update([
            'verification_code' => $faker->randomNumber(6, true)
        ]);
        
        $user->refresh();

        Mail::to($user)->send(new VerificationEmail($user->verification_code));

        return $user;
    }

    /* 
        Request params
        passwords : {password, password_confirmation}
        user
    */
    public function changePassword(Request $request){
        $validator = Validator::make(
            $request->passwords,
            [
                'password' => 'required|confirmed'
            ],
            []
        );
        $validator->validate();

        $user = User::find($request->user['user_id']);

        $user->update([
            'password' => Hash::make($request->passwords['password']),
        ]);

        $user->refresh();

        return $user;
    }

}
