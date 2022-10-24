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
                <table class="table table-sm table-borderless table-hover">
                    <thead class="thead-dark ">
                        <tr >
                            <th class="rounded-tl-md">Title</th>
                            <th>Viewers</th>
                            <th>Posted By</th>
                            <th class="rounded-tr-md">Posted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($announcements as $announcement)
                        <tr class="cursor-pointer rounded-md border-b" data-bs-toggle="modal" data-bs-target="#announcement-view-modal" @click="announcementViewInit({{ $announcement }})" >
                            <td class="max-w-xs {{ $loop->last ? 'rounded-bl-md' : '' }}">{{ $announcement->announcement_title }}</td>
                            <td>{{ $announcement->viewer_role }}</td>
                            <td>Viewers</td>
                            <td class="{{ $loop->last ? 'rounded-br-md' : '' }}">{{ $announcement->created_at->toDayDateTimeString() }}</td>
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
            <div class="modal fade" id="announcement-view-modal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title">@{{ announcement.announcement_title }}</h1>
                        </div>
                        <div class="modal-body">
                            <p>@{{ announcement.announcement_content }}</p>
                        </div>
                        <div class="modal-footer">
                            <p>@{{ announcement.created_at }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script>
    new Vue({
        el: "#announcement-index",
        data: {
            announcement: {}
        },
        methods: {
            announcementViewInit(announcement){
                this.announcement = announcement;
                let updated_at = moment(this.announcement.updated_at);
                this.announcement.updated_at = updated_at.format("MMMM d Y, h:mm A");
            }
        }
    })
</script>
@endsection