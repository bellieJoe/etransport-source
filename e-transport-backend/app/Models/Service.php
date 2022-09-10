<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $primaryKey = 'service_id';

    protected $fillable = [
        'service_type_id', 
        'vehicle_type_id',
        'administrator_id',
        'service_status',
        'driver',
        'license_number',
        'plate_number',
        'fare',
        'mode_of_payment'
    ];
}
