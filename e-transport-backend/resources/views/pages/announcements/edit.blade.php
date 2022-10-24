@extends('pages.master')
@section('master-content')
<section>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Announcements
                        <small>Edit</small>
                    </h1>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('announcements.update' , ['announcement' => $announcement->announcement_id]) }}" method="POST">
                        @csrf
                        @method('put')
                        <div class="mb-2">
                            <label for="">Title</label>
                            <input type="text" name="announcement_title" class="form-control" value="{{ $announcement->announcement_title }}">
                            @error('announcement_title')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <div class="mb-2">
                            <label for="">Viewers</label>
                            <select name="viewer_role" class="form-control">
                                <option value="">-select role-</option>
                                <option value="All" {{ $announcement->viewer_role == 'All' ? 'selected' : '' }}>All</option>
                                <option value="Customer" {{ $announcement->viewer_role == 'Customer' ? 'selected' : '' }}>Customer</option>
                                <option value="Administrator" {{ $announcement->viewer_role == 'Administrator' ? 'selected' : '' }}>Administrator</option>
                            </select>
                            @error('viewer_role')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <div class="mb-2">
                            <label for="">Content</label>
                            <textarea class="form-control" name="announcement_content"  cols="30" rows="10" >{{ $announcement->announcement_content }}</textarea>
                            @error('announcement_content')<p class="text-danger">{{ $message }}</p>@enderror
                        </div>
                        <button class="btn btn-primary d-block ms-auto me-0">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection