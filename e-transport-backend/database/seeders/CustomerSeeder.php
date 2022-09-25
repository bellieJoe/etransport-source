<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* 
        Generate complete Administrator Account
        Generate User, Administrator, Service and Luggage Pricings
        */
        $users = User::factory()->count(10)
        ->has(Customer::factory())
        ->create();

        $users = $users->each(function($user){
            $user->update([
                'role_id' => 3
            ]);
            $user->refresh();
            return $user;
        });
    }
}
