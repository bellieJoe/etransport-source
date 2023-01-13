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
<section id="preferences-index">
    <div class="content-header">
        <div class="container-fluid">
            <h1 class="m-0 text-dark mb-2">
                Preferences 
            </h1>
        </div>
        <div class="container-sm" style='max-width:700px'>
            <form action="{{ route('preferences.update')  }}" method="POST">
                @csrf
                @method('PUT')
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title fw-bold ">Fares</h5><br>
                        <div class="mb-3 ">
                            <label class="fw-normal mb-1">Passengers</label>
                            <input type="number" name="passenger_price" class="form-control form-control-sm" value="{{ $global_settings->passenger_price }}" />
                            @error('passenger_price') <p class="text-danger">{{ $message }}</p> @enderror
                        </div>
                        <div class="mb-3 ">
                            <label class="fw-normal mb-1">Animals</label>
                            <input type="number" name="animal_price" class="form-control form-control-sm" value="{{ $global_settings->animal_price }}" />
                            @error('animal_price') <p class="text-danger">{{ $message }}</p> @enderror
                        </div>
                    </div>
                </div>

                <div class="">
                    <button class="btn btn-primary d-block me-0 ms-auto" type="submit"><i class="fa-solid fa-floppy-disk me-2"></i>Save</button>
                </div>
            </form>
            
        </div>
    </div>
</section>
<script>
    new Vue({
        el: "#preferences-index",
        data: {

        },
        methods: {
          
        },
    })
</script>
@endsection