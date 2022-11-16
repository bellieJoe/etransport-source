<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\TransportBooking;
use App\Models\User;
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

    public function edit($announcement){
        $announcement = Announcement::find($announcement);
        return view('pages.announcements.edit', [
            'announcement' => $announcement
        ]);
    }

    public function update(Request $request, $announcement){
        $request->validate([
            'announcement_title' => ['required', 'max:100'],
            'announcement_content' => ['required', 'max:10000'],
            'viewer_role' => ['required', Rule::in(['All', 'Customer', 'Administrator'])]
        ]);
        DB::transaction(function () use ($request, $announcement) {
            Announcement::where('announcement_id', $announcement)->update([
                'announcement_title' => $request->announcement_title,
                'announcement_content' => $request->announcement_content,
                'viewer_role' => $request->viewer_role
            ]);
        });
        return redirect(route('announcements.index'));
    }

    public function apiUpdate(Request $request, $announcement){
        $request->validate([
            'announcement_title' => ['required', 'max:100'],
            'announcement_content' => ['required', 'max:10000']
        ]);
        DB::transaction(function () use ($request, $announcement) {
            Announcement::where('announcement_id', $announcement)->update([
                'announcement_title' => $request->announcement_title,
                'announcement_content' => $request->announcement_content
            ]);
        });
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

    public function apiStore(Request $request){
        $request->validate([
            'announcement_title' => ['required', 'max:100'],
            'announcement_content' => ['required', 'max:10000'],
            'viewer_role' => ['required', Rule::in(['All', 'Customer', 'Administrator'])]
        ]);

        DB::transaction(function () use ($request) {
            Announcement::create([
                'user_id' => $request->user_id,
                'announcement_title' => $request->announcement_title,
                'announcement_content' => $request->announcement_content,
                'viewer_role' => $request->viewer_role
            ]);
        });
    }


    public function delete($announcement){
        Announcement::destroy($announcement);
        return redirect()->back();
    }

    public function apiDelete($announcement){
        Announcement::destroy($announcement);
    }

    public function getAnnouncementsByUserId($user_id){
        $user = User::find($user_id);
        $announcements = [];
        if($user->role->role_description == 'Customer'){
            $user_bookings = TransportBooking::where('user_customer_id', $user_id)->with(['service.administrator.user'])->get();
            $userIds = [];
            foreach($user_bookings as $booking){
                array_push($userIds, $booking->service->administrator->user->user_id);
            }
            $userIds = [...User::where('role_id', 1)->pluck('user_id'), ...$userIds];
            $announcements = Announcement::whereIn('viewer_role', [$user->role->role_description, 'All'])
            ->whereIn('user_id', $userIds)
            ->orderBy('updated_at', 'desc')
            ->with([
            'user'=> function($query){
                $query->with('role');
            },  
            'comments' => function($query){
                $query->with('user')->orderBy('created_at', 'desc');
            }])
            ->withCount(['comments'])
            ->get();
        }
        else{
            $announcements = Announcement::whereIn('viewer_role', [$user->role->role_description, 'All'])->orderBy('updated_at', 'desc')->with('user.role')->get();
        }
        return $announcements;
    }
}
