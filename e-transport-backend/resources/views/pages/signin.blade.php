@extends('app')
@section('content') 
    <section class="row py-2 align-items-center justify-content-center" style="height: 90vh">
        <div class="card shadow-lg col-3">
            <form class="card-content" action="{{ route('signin') }}"  method="POST">
                @csrf
                <div class="card-header border-bottom-0">
                    <h5 class="card-title fs-2 fw-bold d-block">
                        Sign In
                    </h5>
                    <p class="card-text">Welcome to Etransport Main Administrator Interface. Please Login below to continue.</p>
                </div>
                <div class="card-body">
                    <label class="fs-5">Email</label>
                    <input name="email" type="text" class="form-control form-control-lg mb-4">
                    <label class="fs-5">Password</label>
                    <input name="password" type="password" class="form-control form-control-lg mb-4">
                </div>
                <div class="card-footer bg-transparent">
                    <button type="submit" class="btn btn-primary btn-lg" >Sign In</button>
                </div>
            </form>   
        </div>
        
    </section>
@endsection