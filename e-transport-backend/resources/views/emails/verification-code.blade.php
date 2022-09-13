@component('mail::message')
# Hello

Below is the verification code to verify your account on ETransport App.   

{{-- @component('mail::button', ['url' => ''])
Button Text
@endcomponent --}}
{{-- @component('mail::') --}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
