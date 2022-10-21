@extends('pages.master')
@section('master-content')
<section>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Announcements
                        <small>Create</small>
                    </h1>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('announcements.store') }}" method="POST">
                        @csrf
                        <div class="mb-2">
                            <label for="">Title</label>
                            <input type="text" name="announcement_title" class="form-control">
                            @error('announcement_title')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <div class="mb-2">
                            <label for="">Viewers</label>
                            <select name="viewer_role" class="form-control">
                                <option value="">-select role-</option>
                                <option value="All">All</option>
                                <option value="Customer">Customer</option>
                                <option value="Administrator">Administrator</option>
                            </select>
                            @error('viewer_role')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <div class="mb-2">
                            <label for="">Content</label>
                            <textarea class="form-control" name="announcement_content"  cols="30" rows="10"></textarea>
                            @error('announcement_content')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <button class="btn btn-primary d-block ms-auto me-0">Post</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection