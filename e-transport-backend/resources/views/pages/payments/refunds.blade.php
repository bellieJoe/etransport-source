@extends('pages.master')
@section('master-content')

<section id="users-index">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        Refunds
                    </h1>
                </div>
            </div>
            {{-- <div class="mb-2">
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
            </div> --}}
            <div class="bg-white rounded-md shadow-sm">
               <table class="table table-sm table-hover">
                    <thead>
                        <tr class="bg-dark">
                            <th>Customer</th>
                            <th>Service Owner</th>
                            <th>Amount</th>
                            <th>Service Owner Approval</th>
                            <th>Request Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($refunds as $refund)
                        <tr>
                            <td>{{ $refund->payment->user->name }}</td>
                            <td>{{ $refund->payment->service->administrator->user->name }}</td>
                            <td>Php {{ (json_decode($refund->payment->payment_data)->data->attributes->amount - (json_decode($refund->payment->payment_data)->data->attributes->amount * 0.05) ) / 100 }}</td>
                            <td>{{ Str::title($refund->service_approval) }}</td>
                            <td >{{ Str::title($refund->status) }}</td>
                            <td >{{ $refund->created_at->diffForHumans() }}</td>
                            <td>
                                @if ($refund->status == 'processing')
                                <div class="dropdown">
                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </button>
                                    <div class="dropdown-menu">
                                        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#refund-modal-{{ $refund->refund_id }}">Refund</button>
                                        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#decline-refund-modal-{{ $refund->refund_id }}">Decline Refund</button>
                                    </div>
                                </div>
                                @endif
                            </td>
                        </tr>
                        {{-- refund modal --}}
                        <div class="modal fade" id="refund-modal-{{ $refund->refund_id }}">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <form method="POST" action="{{ route('payments.refunds.refund', ['refund_id' => $refund->refund_id]) }}">
                                    @csrf
                                    <div class="modal-header">
                                        <div class="modal-title fw-bold">Confirm Refund Action</div>
                                    </div>
                                    <div class="modal-body">
                                        @if ($refund->service_approval != 'approved')
                                            <div class="alert alert-warning" role="alert">
                                                Warning: The Service owner either Disapproved or has'nt Approved this Refund request yet.
                                            </div>
                                        @endif
                                        <p>Complete the following refund request</p>
                                        <p class="mb-0">Customer: <span class=text-secondary>{{ $refund->payment->user->name }}</span></p>
                                        <p class="mb-0">Service Owner: <span class=text-secondary>{{ $refund->payment->service->administrator->user->name }}</span></p>
                                        <p class="mb-0">Amount: <span class=text-secondary>Php {{ (json_decode($refund->payment->payment_data)->data->attributes->amount - (json_decode($refund->payment->payment_data)->data->attributes->amount * 0.05) ) / 100 }}</span></p>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button class="btn btn-primary">
                                            Refund
                                        </button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="decline-refund-modal-{{ $refund->refund_id }}">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <form method="POST" action="{{ route('payments.refunds.declineRefund', ['refund_id' => $refund->refund_id]) }}">
                                    @csrf
                                    <div class="modal-header">
                                        <div class="modal-title fw-bold">Confirm Decline Refund Action</div>
                                    </div>
                                    <div class="modal-body">
                                        @if ($refund->service_approval != 'approved')
                                            <div class="alert alert-warning" role="alert">
                                                Warning: The Service owner either Disapproved or has'nt Approved this Refund request yet.
                                            </div>
                                        @endif
                                        <p>Decline the following refund request</p>
                                        <p class="mb-0">Customer: <span class=text-secondary>{{ $refund->payment->user->name }}</span></p>
                                        <p class="mb-0">Service Owner: <span class=text-secondary>{{ $refund->payment->service->administrator->user->name }}</span></p>
                                        <p class="mb-0">Amount: <span class=text-secondary>Php {{ (json_decode($refund->payment->payment_data)->data->attributes->amount - json_decode($refund->payment->payment_data)->data->attributes->fee) / 100 }}</span></p>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button class="btn btn-primary">
                                            Decline
                                        </button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        @empty
                        <tr>
                            <td colspan="5" class="text-center">No Records Found</td>
                        </tr>
                        @endforelse
                        
                    </tbody>
               </table>
            </div>
            <div>
                {{ $refunds }}
            </div>
        </div>
    </div>
</section>
<script>
 
</script>
@endsection