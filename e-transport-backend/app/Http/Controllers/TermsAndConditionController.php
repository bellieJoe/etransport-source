<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TermsAndConditionController extends Controller
{
  public function agree($user){
    User::where('user_id', $user)
    ->update([
        'terms_and_condition' => '1'
    ]);
  }
}
