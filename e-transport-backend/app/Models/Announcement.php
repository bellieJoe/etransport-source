<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'announcement_id';

    protected $fillable = [
        'user_id', 'announcement_content', 'announcement_title'
    ];

    // relationships
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function comments(){
        return $this->hasMany(AnnouncementComment::class, 'announcement_id', 'announcement_id');
    }
}
