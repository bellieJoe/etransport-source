@extends('pages.master')
@section('master-content')

<section id="users-index">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Payments
                    </h1>
                </div>
            </div>
            <div class="mb-2">
                <form method="GET" action="{{ route('payments.index') }}" class="form-inline">
                    <div class="input-group input-group-sm me-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                        </div>
                        <input value="{{ Request::get('name') }}" type="text" name="name" class="form-control form-control-sm" placeholder="Name of Sender">
                    </div>
                    
                    <div class="input-group input-group-sm me-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Status</span>
                        </div>
                        <select name="status" id="status-filter" class="form-control form-control-sm me-2">
                            <option value="">-Select Status-</option>
                            <option value="paid" {{ Request::get('status') == 'paid' ? 'selected' : '' }}>Paid</option>
                            <option value="unpaid" {{ Request::get('status') == 'unpaid' ? 'selected' : '' }}>Unpaid</option>
                            <option value="partially paid" {{ Request::get('status') == 'partially paid' ? 'selected' : '' }}>Patially Paid</option>
                        </select>
                    </div>
                    
                    <button class="btn btn-primary btn-sm ">Apply</button>
                </form>
            </div>
            <div class="bg-white rounded-md shadow-sm">
               <table class="table table-sm table-hover">
                    <thead>
                        <tr class="bg-dark">
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($payments as $payment)
                        <tr>
                            <td>{{ $payment->user->name }}</td>
                            <td>{{ $payment->service->administrator->user->name }}</td>
                            <td>Php {{ $payment->paymentData()->data->attributes->amount / 100 }}</td>
                            <td class="{{ $payment->status == 'unpaid' ? 'text-danger' : 'text-success' }}">{{ Str::title($payment->status) }}</td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center">No Records Found</td>
                        </tr>
                        @endforelse
                        
                    </tbody>
               </table>
            </div>
            <div>
                {{ $payments }}
            </div>
        </div>
    </div>
</section>
<script>
 
</script>
@endsection