<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class RefundController extends Controller
{
    //
    public function getRefundsByUserAdministratorId($user_id){
        $payment_ids = User::find($user_id)->administrator->service->payments->pluck('payment_id');
        return Refund::whereIn('payment_id', $payment_ids)
        ->with([
            'payment.user'
        ])
        ->orderBy('updated_at', 'desc')
        ->get();
    }

    public function getRefundsByUserCustomerId($user_id){
        $payment_ids = Payment::where('user_id', $user_id)->pluck('payment_id');
        return Refund::whereIn('payment_id', $payment_ids)
        ->with([
            'payment.user',
            'payment.service.administrator.user',
            'payment.transportBooking'
        ])
        ->orderBy('updated_at', 'desc')
        ->get();
    }

    public function approveRefund($refund_id){
        return \DB::transaction(function () use($refund_id) {
            $refund = Refund::where('refund_id', $refund_id);
            if($refund->first()->expire_date->lessThan(Carbon::now()) ){
                return response([
                    'message' => 'This refund has expired'
                ], 400);
            }
            $refund->update([
                'service_approval' => 'approved'
            ]);
            return $refund->with('payment.user')->first();
        });
    }

    public function disapproveRefund($refund_id){
        return \DB::transaction(function () use($refund_id) {
            $refund = Refund::where('refund_id', $refund_id);
            if($refund->first()->expire_date->lessThan(Carbon::now()) ){
                return response([
                    'message' => 'This refund has expired'
                ], 400);
            }
            $refund->update([
                'service_approval' => 'disapproved'
            ]);
            return $refund->with('payment.user')->first();
        });
    }

    public function index(){
        $refunds = Refund::query()
        ->orderBy('updated_at', 'desc')
        ->paginate(20);
        return view('pages.payments.refunds')
        ->with([
            'refunds' => $refunds
        ]);
    }

    public function refund($refund_id){
        \DB::transaction(function () use ($refund_id) {
            $refund = Refund::find($refund_id);
            $refund->payment->refundPayment();
            $refund->update([
                'status' => 'succeeded'
            ]);
        });
        return redirect()->back();
    }

    public function declineRefund($refund_id){
        \DB::transaction(function () use ($refund_id) {
            $refund = Refund::find($refund_id);
            $refund->update([
                'status' => 'declined'
            ]);
        });
        return redirect()->back();
    }
}
