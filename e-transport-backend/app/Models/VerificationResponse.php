<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationResponse extends Model
{
    use HasFactory;

    protected $primaryKey = 'verification_response_id';

    protected $fillable = [
        'verification_proof_id', 'response_role_id', 'user_main_administrator_id', 'message'
    ];
}
