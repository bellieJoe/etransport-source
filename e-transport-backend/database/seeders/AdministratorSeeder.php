<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Administrator;
use App\Models\Service;
use App\Models\LuggagePricing;

use Illuminate\Database\Seeder;

class AdministratorSeeder extends Seeder
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
        ->has(Administrator::factory()->has(Service::factory()->has(LuggagePricing::factory())))
        ->create();

        $users = $users->each(function($user){
            $user->update([
                'role_id' => 2
            ]);
            $user->refresh();
            return $user;
        });
    }
}
