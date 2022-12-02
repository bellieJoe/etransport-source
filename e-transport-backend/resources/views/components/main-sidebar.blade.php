@php
    $path = explode('/', Request::path());
@endphp
<aside class="main-sidebar sidebar-dark-primary elevation-4 vh-100 layout-fixed sidebar-mini ">
    <div class="brand-link d-flex justify-content-between align-items-center">
        <a class="brand-link fw-bold text-center" href="index3.html">
            <span class="brand-text">ETransport </span>
        </a>
    </div>
    <!-- Sidebar -->
    <div class="sidebar ">
        <!-- Sidebar user panel (optional) -->
        {{-- <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="info">
                <a href="#" class="d-block">Name of Admin</a>
            </div>
        </div> --}}
        <!-- Sidebar Menu -->
        <nav class="mt-2 ">
            <ul class="nav nav-pills nav-sidebar nav-child-indent flex-column" >
                <li class="nav-item {{ $path[0] == 'users' ? 'menu-open' : '' }}" data-widget="treeview">
                    <a href="#" class="nav-link ">
                        <i class="nav-icon far fa-user"></i>
                        <p>
                            User Accounts
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview ">
                        <li class="nav-item">
                            <a href="{{ route('users.administrators.index') }}" class="nav-link {{ $path[0] == 'users' &&  $path[1] == 'administrators' ? 'active' : '' }}">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Administrator</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('users.passengers.index') }}" class="nav-link {{ $path[0] == 'users' &&  $path[1] == 'passengers' ? 'active' : '' }}">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Passenger</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item ">
                    <a href="{{ route('announcements.index') }}" class="nav-link {{ $path[0] == 'announcements' ? 'active' : '' }}">
                        <i class="nav-icon fa-solid fa-bullhorn"></i>
                        <p>Announcements</p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a href="{{ route('payments.index') }}" class="nav-link {{ $path[0] == 'payments' ? 'active' : '' }}">
                        <i class="nav-icon far fa-credit-card"></i>
                        <p>Payments</p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
</aside>

<script>

</script>