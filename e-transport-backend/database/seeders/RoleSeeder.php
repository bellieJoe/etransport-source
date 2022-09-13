<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'role_id' => 1,
                'role_description' => 'Main Administrator'
            ],
            [
                'role_id' => 2,
                'role_description' => 'Administrator'
            ],
            [
                'role_id' => 3,
                'role_description' => 'Customer'
            ],
            
        ];

        foreach ($roles as $role) {
            Role::create(
                $role
            );
        }


        
        
    }
}
