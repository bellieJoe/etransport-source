<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnnouncementComment;

class AnnouncementCommentController extends Controller
{
    //
   public function apiStore(Request $request){
    $request->validate([
        'user_id' => ['required'],
        'comment' => ['required', 'max:10000'],
        'announcement_id' => ['required']
    ]);

    \DB::transaction(function () use ($request) {
        $comment = AnnouncementComment::create([
            'comment' => $request->comment,
            'announcement_id' => $request->announcement_id,
            'user_id' => $request->user_id
        ]);

        $comment->refresh();

        return $comment;
    });
   }
}
