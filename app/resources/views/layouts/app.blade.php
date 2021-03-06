<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>GoodGames | Community and Store HTML Game Template</title>

    <meta name="description" content="GoodGames - Bootstrap template for communities and games store">
    <meta name="keywords" content="game, gaming, template, HTML template, responsive, Bootstrap, premium">
    <meta name="author" content="_nK">

    <link rel="icon" type="image/png" href="images/favicon.png">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- START: Styles -->

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700%7cOpen+Sans:400,700" rel="stylesheet" type="text/css">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="{{asset('vendor/bootstrap/dist/css/bootstrap.min.css')}}">

    <!-- FontAwesome -->
    <script defer src="{{asset('vendor/fontawesome-free/js/all.js')}}"></script>
    <script defer src="{{asset('vendor/fontawesome-free/js/v4-shims.js')}}"></script>

    <!-- IonIcons -->
    <link rel="stylesheet" href="{{asset('vendor/ionicons/css/ionicons.min.css')}}">

    <!-- Flickity -->
    <link rel="stylesheet" href="{{asset('vendor/flickity/dist/flickity.min.css')}}">

    <!-- Photoswipe -->
    <link rel="stylesheet" type="text/css" href="{{asset('vendor/photoswipe/dist/photoswipe.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendor/photoswipe/dist/default-skin/default-skin.css')}}">

    <!-- Seiyria Bootstrap Slider -->
    <link rel="stylesheet" href="{{asset('vendor/bootstrap-slider/dist/css/bootstrap-slider.min.css')}}">

    <!-- Summernote -->
    <link rel="stylesheet" type="text/css" href="{{asset('vendor/summernote/dist/summernote-bs4.css')}}">

    <!-- GoodGames -->
    <link rel="stylesheet" href="{{asset('css/goodgames.css')}}">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">

    <!-- END: Styles -->

    <!-- jQuery -->
    <script src="{{asset('vendor/jquery/dist/jquery.min.js')}}"></script>

</head>

<body>

@yield('content')

<!-- Object Fit Polyfill -->
<script src="{{asset('vendor/object-fit-images/dist/ofi.min.js')}}"></script>

<!-- GSAP -->
<script src="{{asset('vendor/gsap/src/minified/TweenMax.min.js')}}"></script>
<script src="{{asset('vendor/gsap/src/minified/plugins/ScrollToPlugin.min.js')}}"></script>

<!-- Popper -->
<script src="{{asset('vendor/popper.js/dist/umd/popper.min.js')}}"></script>

<!-- Bootstrap -->
<script src="{{asset('vendor/bootstrap/dist/js/bootstrap.min.js')}}"></script>

<!-- Sticky Kit -->
<script src="{{asset('vendor/sticky-kit/dist/sticky-kit.min.js')}}"></script>

<!-- Jarallax -->
<script src="{{asset('vendor/jarallax/dist/jarallax.min.js')}}"></script>
<script src="{{asset('vendor/jarallax/dist/jarallax-video.min.js')}}"></script>

<!-- imagesLoaded -->
<script src="{{asset('vendor/imagesloaded/imagesloaded.pkgd.min.js')}}"></script>

<!-- Flickity -->
<script src="{{asset('vendor/flickity/dist/flickity.pkgd.min.js')}}"></script>

<!-- Photoswipe -->
<script src="{{asset('vendor/photoswipe/dist/photoswipe.min.js')}}"></script>
<script src="{{asset('vendor/photoswipe/dist/photoswipe-ui-default.min.js')}}"></script>

<!-- Jquery Validation -->
<script src="{{asset('vendor/jquery-validation/dist/jquery.validate.min.js')}}"></script>

<!-- Jquery Countdown + Moment -->
<script src="{{asset('vendor/jquery-countdown/dist/jquery.countdown.min.js')}}"></script>
<script src="{{asset('vendor/moment/min/moment.min.js')}}"></script>
<script src="{{asset('vendor/moment-timezone/builds/moment-timezone-with-data.min.js')}}"></script>

<!-- Hammer.js')}} -->
<script src="{{asset('vendor/hammerjs/hammer.min.js')}}"></script>

<!-- NanoSroller -->
<script src="{{asset('vendor/nanoscroller/bin/javascripts/jquery.nanoscroller.js')}}"></script>

<!-- SoundManager2 -->
<script src="{{asset('vendor/soundmanager2/script/soundmanager2-nodebug-jsmin.js')}}"></script>

<!-- Seiyria Bootstrap Slider -->
<script src="{{asset('vendor/bootstrap-slider/dist/bootstrap-slider.min.js')}}"></script>

<!-- Summernote -->
<script src="{{asset('vendor/summernote/dist/summernote-bs4.min.js')}}"></script>

<!-- nK Share -->
{{--<script src="plugins/nk-share/nk-share.js"></script>--}}

<!-- GoodGames -->
@routes
<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/goodgames.js')}}"></script>
<script src="{{asset('js/goodgames-init.js')}}"></script>
<!-- END: Scripts -->



</body>
</html>
