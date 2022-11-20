<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'notification_message' => 'required|max:5000',
            'notification_title' => 'required|max:100',
            'user_id' => 'required',
            'link' => 'required|max:5000'
        ]);

        return \DB::transaction(function () use ($request) {
            $notification = Notification::create([
                'notification_message' => $request->notification_message,
                'notification_title' => $request->notification_title,
                'link' => $request->link,
                'user_id' => $request->user_id
            ]);
            $notification->refresh();
            return $notification;
        });
    }
}
