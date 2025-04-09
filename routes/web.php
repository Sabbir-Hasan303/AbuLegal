<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     $categories = \App\Models\Category::with(['services' => function($query) {
//         $query->where('status', 'active')
//              ->take(4);
//     }])->whereHas('services', function($query) {
//         $query->where('status', 'active');
//     })->get();

//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//         'serviceCategories' => $categories
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/main-services', [HomeController::class, 'getMainServices'])->name('services.main');

Route::get('/services', [ServiceController::class, 'getServices'])->name('services.all');

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


    Route::get('/dashboard/contact', [ContactController::class, 'getContacts'])->name('contact.list');
    Route::patch('/dashboard/contact/{contact}/status', [ContactController::class, 'updateStatus'])->name('contact.update.status');
    Route::get('/dashboard/faq', function () {return Inertia::render('Dashboard/Faq');})->name('faq');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
