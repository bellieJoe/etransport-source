<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    use HasFactory;

    protected $primaryKey = 'vehicle_type_id';

    protected $fillable = [
        'vehicle_type', 'vehicle_description'
    ];
}
