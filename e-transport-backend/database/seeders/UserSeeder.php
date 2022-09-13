<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        User::create([
            'name' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'username' => $faker->unique()->name(),
            'contact_number' => '9865325478',
            'email_verified_at' => now(),
            'role_id' => 1,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);

    }
}
