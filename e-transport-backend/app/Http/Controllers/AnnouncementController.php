<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AnnouncementController extends Controller
{
    public function index(){
        $announcements = Announcement::query()->orderBy('created_at', 'desc')->paginate(10);
        return view('pages.announcements.index')->with([
            'announcements' => $announcements
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'announcement_title' => ['required', 'max:100'],
            'announcement_content' => ['required', 'max:10000'],
            'viewer_role' => ['required', Rule::in(['All', 'Customer', 'Administrator'])]
        ]);

        DB::transaction(function () use ($request) {
            Announcement::create([
                'user_id' => Auth::user()->user_id,
                'announcement_title' => $request->announcement_title,
                'announcement_content' => $request->announcement_content,
                'viewer_role' => $request->viewer_role
            ]);
        });

        return redirect(route('announcements.index'));
    }
}
