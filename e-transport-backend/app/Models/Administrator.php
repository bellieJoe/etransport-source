<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrator extends Model
{
    use HasFactory;

    protected $primaryKey = 'administrator_id';

    protected $fillable = [
        'user_id', 'verified_at'
    ];

    public function service(){
        return $this->hasOne(Service::class, 'administrator_id', 'administrator_id');
    }
}
