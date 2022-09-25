<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LuggagePricingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'small' => $this->faker->randomElement([300,400,500]),
            'medium' => $this->faker->randomElement([600,700,800]),
            'large' => $this->faker->randomElement([900,1000,1100]),
            'extra_large' => $this->faker->randomElement([1200,1300,1400,1500])
        ];
    }
}
