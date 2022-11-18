<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /* 
    request params message, members[int], announcement_id
    */
    public function store(Request $request){
        $request->validate([
            'message' => "required|max:5000"
        ]);
        \DB::transaction(function () use ($request) {
            $message = Message::create([
                'message' => $request->message,
                'members' => json_encode($request->members),
                'transport_booking_id' => $request->transport_booking_id ? $request->transport_booking_id : null
            ]);
            $message->refresh();
            return $message;
        });

    }
}
