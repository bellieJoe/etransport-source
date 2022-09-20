<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LuggagePricing extends Model
{
    use HasFactory;

    protected $primaryKey = 'luggage_pricing_id';

    protected $guarded = [];
}
