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
            'link' => 'required|max:5000',
            'link_fragment' => 'required|max:5000'
        ]);

        return \DB::transaction(function () use ($request) {
            $notification = Notification::create([
                'notification_message' => $request->notification_message,
                'notification_title' => $request->notification_title,
                'link' => $request->link,
                'link_fragment' => $request->link_fragment,
                'user_id' => $request->user_id
            ]);
            $notification->refresh();
            return $notification;
        });
    }

    public function getNotificationsByUserId($user_id){
        $notifications = Notification::where('user_id', $user_id)->orderBy('created_at', 'desc');
        $notificationsUpdate = $notifications;
        $notificationsReturn = $notifications->paginate(20);
        $notificationsUpdate->update([
            'isRead' => 1
        ]);
        return $notificationsReturn;
    }
}
