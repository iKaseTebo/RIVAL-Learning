@extends('layouts.app')

@section('content')

    
<div class="nk-main">
    <div id="container">
   @include('partials._zalneor', ['name'=>'Beevz'])
        This is body content of the page more HTML etc. will go in here.
    </div>

    <div class="nk-gap-4"></div>
    

</div>

@endsection