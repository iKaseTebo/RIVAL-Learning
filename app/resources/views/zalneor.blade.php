@extends('layouts.app')

@section('content')

    @include('partials._zalneor', ['name'=>'Zaddy'])

    <div id="gallery-container">
        <div id="gallery-section">
            <div class="gallery-image-template-div hidden col-4">
                <ul class="template-image-ul">
                    <li class="template-image-id"></li>
                    <li class="template-image-source"></li>
                    <li class="template-image-text"></li>
                </ul>
            </div>
        </div>
    </div>
@endsection