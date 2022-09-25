<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'birthdate' => '2022-09-17',
            'address' => $this->faker->randomElement(['Poras', 'Ihatub', 'Tanza', 'Murallon'])." Boac, Marinduque"
        ];
    }
}
