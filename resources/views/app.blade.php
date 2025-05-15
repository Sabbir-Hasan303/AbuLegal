<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Abu Legal') }}</title>

        {{-- Favicon --}}
        <link rel="icon" href="{{ asset('images/logo/favicon.ico') }}" type="image/x-icon">

        {{-- SEO --}}
        <meta name="description" content="Abu Legal is a law firm that provides legal services to clients in the UAE.">
        <meta name="keywords" content="Abu Legal, law firm, legal services, UAE">
        <meta name="author" content="Abu Legal">
        <meta name="robots" content="index, follow">
        <meta name="googlebot" content="index, follow">
        <meta name="google" content="notranslate">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

        <!-- Google tag (gtag.js) -->
        {{-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-FE5WMP6DCS"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FE5WMP6DCS');
        </script> --}}

        <!-- Google tag (staging) (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTVZGJ74P5"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RTVZGJ74P5');
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
