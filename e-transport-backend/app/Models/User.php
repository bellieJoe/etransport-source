<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens ,HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'name', 'email', 'password', 'contact_number', 'role_id'
    ];

    // protected $hidden = [
    //     'password', 'remember_token',
    // ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /* 
    Relationships
    */
    public function role(){
        return $this->hasOne(Role::class, 'role_id', 'role_id');
    }

}
