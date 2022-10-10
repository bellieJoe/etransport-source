<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

     {{-- Main CSS --}}
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    {{-- Bootstrap icons --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">

    {{-- Bootstrap 5 CSS --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <!-- fontawesome -->
    <script src="https://kit.fontawesome.com/2a90b2a25f.js" crossorigin="anonymous"></script>

    <title>ETransport Admin</title>
</head>
<body>
    <section class="row g-0">
        <nav class="col-auto bg-dark vh-100 ">
            <div class="mb-3 p-3 border-b border-gray-500">
                <a class="navbar-brand text-light fw-bold fs-4" href="/">ETransport</a>
            </div>
            <ul class="nav nav-pills flex-column nav-fill px-3 ">
                <li class="nav-item ">
                    <a href="#" class="nav-link active text-light text-left"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
                </li>
                {{-- <li class="nav-item ">
                    <a href="#" class="nav-link  text-light text-left"><i class="bi bi-people me-2"></i> Administrators</a>
                </li> --}}
                <li class="nav-item ">
                    <button  class="nav-link text-light text-left"><i class="bi bi-people me-2"></i> Administrators <i class="fas fa-caret-left text-gray-500 ms-2"></i></button>
                </li>
            </ul>
        </nav>  
        <div class="col">

        </div>
    </section>

    {{-- Bootstrap 5 JS --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>