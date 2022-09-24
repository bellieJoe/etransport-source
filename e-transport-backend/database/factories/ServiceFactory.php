<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Administrator;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceFactory extends Factory
{
    protected $model = Service::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $administrator_ids = Administrator::query()->get()->pluck('administrator_id');
        return [
            // 'administrator_id' => $this->faker->randomElement($administrator_ids),
            'service_status' => 'close',
            'driver' => $this->faker->name('male'),
            'service_name' => Str::title($this->faker->word()),
            'license_number' => $this->faker->ean8(),
            'plate_number' => $this->faker->ean8(),
            'vehicle_model' => $this->faker->company(),
            'capacity' => $this->faker->randomNumber(1, true),
            'mode_of_payment' => json_encode($this->faker->randomElements(['Cash', 'GCash', 'Paymaya'])),
            'fare' => 1500,
            'service_type' => $this->faker->randomElement(['passenger', 'luggage', 'both'])
        ];
    }
}
