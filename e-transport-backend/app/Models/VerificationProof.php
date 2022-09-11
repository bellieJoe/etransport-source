<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationProof extends Model
{
    use HasFactory;

    protected $primaryKey = 'verification_proof_id';

    protected $fillable = [
        'administrator_id', 'url'
    ];

}
