<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use App\Models\User;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    //
    public function getRefundsByUserAdministratorId($user_id){
        $payment_ids = User::find($user_id)->administrator->service->payments->pluck('payment_id');
        return Refund::whereIn('payment_id', $payment_ids)->orderBy('updated_at', 'desc')->get();
    }
}
