<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $role_id = null;
    // public function __construct($role_id = null){
    //     $this->role_id = $role_id;
    // }

    // public function setRole($role_id){
    //     $this->role_id = $role_id;
    //     return $this;
    // }

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $role_ids = [3,2];
        $firstname = $this->faker->firstname();
        $lastname = $this->faker->lastname();
        $name = $firstname." ".$lastname;
        return [
            'name' => $name,
            'email' => $firstname.$lastname."@hotmail.red", // interact email from generator.email website
            'username' => $firstname.$lastname,
            'contact_number' => '9865325478',
            'email_verified_at' => now(),
            'role_id' => $this->faker->randomElement($role_ids),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
