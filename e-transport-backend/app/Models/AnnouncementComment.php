<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementComment extends Model
{
    use HasFactory;

    protected $primaryKey = 'comment_id';

    protected $guarded = [];

    /* 
    Relationships
    */
    public function user(){
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
