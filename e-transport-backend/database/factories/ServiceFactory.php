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
            'sid' => 'sid_'.Str::random(30).'_'.time(),
            // 'marinduque_departure_datetime' => '2022-10-18 00:00:00',
            // 'manila_departure_datetime' => $this->faker->randomElement([null, '2022-10-18 00:00:00']),
            'driver' => $this->faker->name('male'),
            'service_name' => Str::title($this->faker->word()),
            'license_number' => $this->faker->ean8(),
            'plate_number' => $this->faker->ean8(),
            'vehicle_model' => $this->faker->company(),
            'capacity' => $this->faker->randomNumber(1, true),
            'gcash_account' => '9999999999',
            // 'mode_of_payment' => json_encode($this->faker->randomElements(['Cash', 'GCash'])),
            'fare' => 1500,
            'service_type' => json_encode($this->faker->randomElements(['passenger', 'luggage', 'animal'], 2))
        ];
    }
}
