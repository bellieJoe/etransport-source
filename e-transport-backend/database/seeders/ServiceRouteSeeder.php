<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceRoute;

class ServiceRouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $routes = [
            'Marinduque to Manila vice versa',
            'Marinduque to Cavite vice versa',
            'Marinduque to Batangas vice versa',
        ];
    }
}
