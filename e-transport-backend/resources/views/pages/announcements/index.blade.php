@extends('pages.master')
@section('master-content')
<section>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Announcements <a href="{{ route('announcements.create') }}" class="btn btn-outline-primary btn-sm"><i class="fa-solid fa-plus"></i></a>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection