<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fare extends Model
{
    use HasFactory;

    protected $primaryKey = 'fare_id';

    protected $fillable = [
        'service_id', 'start_location', 'drop_off_location', 'fare', 'service_type'
    ];
}
