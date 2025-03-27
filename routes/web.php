<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/services/{slug}', function ($slug) {
    return Inertia::render('Single-Service', [
        'params' => ['slug' => $slug]
    ]);
});

// middleware group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {return Inertia::render('Dashboard/Dashboard');})->name('dashboard');

    Route::get('/dashboard/services', function () {return Inertia::render('Dashboard/Services/ServicesList');})->name('services.list');

    Route::get('/dashboard/services/add', function () {return Inertia::render('Dashboard/Services/AddService');})->name('services.add');

    Route::get('/dashboard/services/edit/{id}', function ($id) {
        return Inertia::render('Dashboard/Services/EditService', [
            'id' => $id
        ]);
    })->name('services.edit');

    Route::get('/dashboard/services/delete/{id}', function ($id) {
        return Inertia::render('Dashboard/Services/DeleteService', [
            'id' => $id
        ]);
    })->name('services.delete');

    Route::get('/dashboard/contact', function () {return Inertia::render('Dashboard/ContactList');})->name('contact.list');

    Route::get('/dashboard/faq', function () {return Inertia::render('Dashboard/Faq');})->name('faq');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
