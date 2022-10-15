@extends('app')
@section('content')
<div class="wrapper ">
    @include('components.main-header')
    @include('components.main-sidebar')
    <div class="content-wrapper bg-gray-200 p-2">this is the content</div>
</div>
@endsection