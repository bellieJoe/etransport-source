<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;

    protected $primaryKey ='refund_id';
    
    protected $guarded = [];

    protected $casts = [
        'expire_date' => 'datetime:Y-m-d',
    ];

    /* 
    Relationships
    */
    public function payment(){
        return $this->hasOne(Payment::class, 'payment_id', 'payment_id');
    }
}
