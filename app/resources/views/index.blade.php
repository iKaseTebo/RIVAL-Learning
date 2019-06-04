@extends('layouts.app')

@section('content')

    {{-- Notice These Includes and Go to the Partials Folders and Look at the Elements --}}
@include('partials._header')
<div class="nk-main">

    <div id="container">
        This is body content of the page more HTML etc. will go in here.
    </div>

    <div class="nk-gap-4"></div>
    {{-- Notice These Includes and Go to the Partials Folders and Look at the Elements --}}
    @include('partials._footer')

</div>

@endsection