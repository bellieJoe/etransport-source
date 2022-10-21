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
            <div class="card">
                <div class="card-body">
                    <h5>Announcement List</h5>
                    <table class="table table-sm table-borderless table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Viewers</th>
                                <th>Posted By</th>
                                <th>Posted On</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($announcements as $announcement)
                            <tr class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#announcement-view-modal" @click="announcementViewInit({{ $announcement }})" >
                                <td class="max-w-xs">{{ $announcement->announcement_title }}</td>
                                <td>{{ $announcement->viewer_role }}</td>
                                <td>Viewers</td>
                                <td>{{ $announcement->created_at->diffForHumans() }}</td>
                            </tr>
                            @endforeach                            
                        </tbody>
                    </table>
                </div>
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
                            {{-- <p>@{{ announcement.created_at }})->diffForHumans()</p> --}}
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
                console.log(this.announcement);
                console.log("sample init");
            }
        }
    })
</script>
@endsection