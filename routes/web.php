<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/services', function () {
    return Inertia::render('Services');
});

Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

// middleware group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {return Inertia::render('Dashboard/Dashboard');})->name('dashboard');

    // services
    Route::get('/dashboard/services', [ServiceController::class, 'index'])->name('services.list');
    Route::get('/dashboard/services/add', [ServiceController::class, 'create'])->name('services.add');
    Route::post('/dashboard/services/add', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/dashboard/services/edit/{slug}', [ServiceController::class, 'edit'])->name('services.edit');
    Route::post('/dashboard/services/edit/{slug}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/dashboard/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');


    Route::get('/dashboard/contact', function () {return Inertia::render('Dashboard/ContactList');})->name('contact.list');
    Route::get('/dashboard/faq', function () {return Inertia::render('Dashboard/Faq');})->name('faq');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
