@component('mail::message')
# Hello

Below is the verification code to verify your account on ETransport App.   

@component('mail::panel')
    <h1>{{ $code }}</h1>
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
