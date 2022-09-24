<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AdministratorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        /* 
            This administrator will base on the user table
            -- No Administrator will be generated if all admin in the Users table already has admin record
        */
        return [
            //
            // ''
            // ''
        ];
    }
}
