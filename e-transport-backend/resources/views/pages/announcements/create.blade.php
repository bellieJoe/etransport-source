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
                    <form action="">
                        <div class="mb-2">
                            <label for="">Title</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label for="">Content</label>
                            <textarea class="form-control" name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button class="btn btn-primary d-block ms-auto me-0">Post</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection