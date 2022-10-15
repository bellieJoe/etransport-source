<nav class="main-header navbar navbar-expand navbar-white navbar-light ">
    <ul class="navbar-nav">
        <li class="nav-item">
            <button class="pushmenu btn" data-widget="pushmenu" role="button"><i class="fas fa-bars"></i></button>
        </li>
    </ul>
    <!-- Left navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="fa-regular fa-user"></i></a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="{{ route('logout') }}"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a></li>
            </ul>
        </li>
    </ul>
</nav>