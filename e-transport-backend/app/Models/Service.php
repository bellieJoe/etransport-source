<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'service_id';

    protected $fillable = [
        'administrator_id',
        'driver',
        'service_name',   
        'license_number',
        'plate_number',
        'vehicle_model',
        'capacity',
        'mode_of_payment',
        'fare',
        'load_type',
        'service_status'
    ];

}
