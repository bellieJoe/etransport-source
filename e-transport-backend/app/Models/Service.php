<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'service_id';

    protected $guarded = [];

    public function administrator(){
        return $this->belongsTo(Administrator::class, 'administrator_id', 'administrator_id');
    }
}
