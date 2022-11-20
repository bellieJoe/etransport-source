<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /* 
    request params message, members[int], transport_booking_id
    */
    public function store(Request $request){
        $request->validate([
            'message' => "required|max:5000"
        ]);
        return \DB::transaction(function () use ($request) {
            $message = Message::create([
                'message' => $request->message,
                'user_id' => $request->user_id,
                'members' => json_encode($request->members),
                'transport_booking_id' => $request->transport_booking_id ? $request->transport_booking_id : null
            ]);
            $message->refresh();
            return $message;
        });


    }

    public function getMessagesByMembers(Request $request){
        return Message::whereJsonContains('members', array_map('intval', $request->members))
        ->orderBy('created_at', 'desc')
        ->paginate(50)->map(function($item){
            return $item;
        });
    }

    public function getConversationsByUserId(Request $request, $user_id){
        $userIds = Message::whereJsonContains('members', (int)$user_id)
        ->orderBy('created_at', 'desc')
        ->pluck('members')
        ->map(function($item, $key) use ($user_id){
            $item = json_decode($item);
            if($item[0] == $user_id){
                return $item[1];
            }
            return $item[0];
        })
        ->unique()
        ->values();

        $users = User::whereIn('user_id', $userIds)->paginate(100);
        $users = $users->map(function($user) use ($user_id) {
            $user->lastMessage = Message::whereJsonContains('members', [$user->user_id, (int)$user_id])->orderBy('created_at', 'desc')->first();
            return $user;
        })
        ->sortByDesc('lastMessage.created_at')
        ->values();
        return $users;
    }
}
