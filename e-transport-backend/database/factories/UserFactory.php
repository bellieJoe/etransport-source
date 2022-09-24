<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
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
        $name = $this->faker->name;
        return [
            'name' => $name,
            'email' => $this->faker->unique()->safeEmail,
            'username' => $name,
            'contact_number' => '9865325478',
            'email_verified_at' => now(),
            'role_id' => $this->faker->randomElement($role_ids),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
