@extends('pages.master')
@section('master-content')

<section id="users-index">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        {{ $title  }} 
                    </h1>
                </div>
            </div>
            <div class="mb-2">
                <form method="GET" action="{{ route('users.'.Str::lower($title).'.index') }}" class="form-inline">
                    <input type="text" class="form-control form-control-sm me-2 w-25" placeholder="Search {{ $title }}" name="search" value="{{ Request::get('search') }}">
                    <button class="btn btn-primary btn-sm ">Search</button>
                </form>
            </div>
            <div class="bg-white rounded-md shadow-sm">
               <table class="table table-sm table-hover">
                    <thead>
                        <tr class="bg-dark">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($users as $user)
                        <tr>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td>+63{{ $user->contact_number }}</td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="3" class="text-center">No Records Found</td>
                        </tr>
                        @endforelse
                        
                    </tbody>
               </table>
            </div>
            <div>
                {{ $users }}
            </div>
        </div>
    </div>
</section>
<script>
 
</script>
@endsection