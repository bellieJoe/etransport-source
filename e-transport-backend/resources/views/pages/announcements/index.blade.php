@extends('pages.master')
@section('master-content')
<style>
    td{
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        overflow: hidden;
        max-width: 100px;
    }
</style>
<section id="announcement-index">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Announcements <a href="{{ route('announcements.create') }}" class="btn btn-outline-primary btn-sm"><i class="fa-solid fa-plus"></i></a>
                    </h1>
                </div>
            </div>
            <div class="bg-white rounded-md shadow-sm">
                <table class="table table-sm table-borderless">
                    <thead class="thead-dark ">
                        <tr >
                            <th class="rounded-tl-md">Title</th>
                            <th>Viewers</th>
                            <th>Posted By</th>
                            <th>Posted On</th>
                            <th class="rounded-tr-md"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($announcements as $announcement)
                        <tr class="cursor-pointer rounded-md border-b" @mouseOver="showAnnouncementActions({{ $announcement->announcement_id }})" @mouseOut="hideAnnouncementActions({{ $announcement->announcement_id }})">
                            <td class="max-w-xs {{ $loop->last ? 'rounded-bl-md' : '' }}">{{ $announcement->announcement_title }}</td>
                            <td>{{ $announcement->viewer_role }}</td>
                            <td>{{ $announcement->user->name }}</td>
                            <td >{{ $announcement->created_at->toDayDateTimeString() }}</td>
                            <td class="{{ $loop->last ? 'rounded-br-md' : '' }} text-right">
                                <div class="btn-group" style="opacity: 0%" id="announcement_actions_{{ $announcement->announcement_id }}">
                                    <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#announcement-view-modal" @click="announcementViewInit({{ $announcement }})"> <i class="fa-solid fa-eye"></i></button>
                                    <a href="{{ route('announcements.edit', ['announcement' => $announcement->announcement_id]) }}" type="button" class="btn btn-primary btn-sm"><i class="fa-regular fa-pen-to-square"></i></a href="#">
                                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delete_announcement_modal" @click="initDeleteAnnouncementModal({{ $announcement->announcement_id }})"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="rounded-b-md">No Announcements</td>
                            </tr >
                        @endforelse                     
                    </tbody>
                </table>
            </div>
            <div>
                {{ $announcements }}
            </div>
            {{-- view announcement modal --}}
            <div class="modal fade" id="announcement-view-modal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title">@{{ announcement.announcement_title }}</h1>
                        </div>
                        <div class="modal-body">
                            <p class="modal-subtitle"><span class="fw-bold">Viewers,</span><br> @{{ announcement.viewer_role }}</p>
                            <p>@{{ announcement.announcement_content }}</p>
                        </div>
                        <div class="modal-footer">
                            <p>@{{ announcement.updated_at }}</p>
                        </div>
                    </div>
                </div>
            </div>
            {{-- delete announcement modal --}}
            <div class="modal fade" id="delete_announcement_modal">
                <div class="modal-dialog modal-dialog-centered">
                    <form method="POST" :action="'/announcements/' + announcementToDelete" class="modal-content">
                        @csrf
                        @method('DELETE')
                        <div class="modal-header">
                            <h3 class="modal-title text-danger">Delete Confirmation</h3>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete this announcement?</p>
                            <p>Users won't see this annoucement again.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancel</button>
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<script>
    new Vue({
        el: "#announcement-index",
        data: {
            announcement: {},
            announcementToDelete : null,
        },
        methods: {
            announcementViewInit(announcement){
                this.announcement = announcement;
                let updated_at = moment(this.announcement.updated_at);
                this.announcement.updated_at = updated_at.format("MMMM d Y, h:mm A");
            },
            showAnnouncementActions(announcement_id){
                $(`#announcement_actions_${announcement_id}`).css('opacity', '100%');
            },
            hideAnnouncementActions(announcement_id){
                
                $(`#announcement_actions_${announcement_id}`).css('opacity', '0%');
            },
            initDeleteAnnouncementModal(announcement_id){
                this.announcementToDelete = announcement_id
            }
        },
    })
</script>
@endsection