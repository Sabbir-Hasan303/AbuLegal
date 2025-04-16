<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\NewsletterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AttorneyController;
use App\Http\Controllers\DashboardController;

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

// contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// about
Route::get('/about', [HomeController::class, 'about'])->name('about');

// services
Route::get('/main-services', [HomeController::class, 'getMainServices'])->name('services.main');
Route::get('/services', [ServiceController::class, 'getServices'])->name('services.all');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

// newsletter
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');

// middleware group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Google Reviews
    Route::get('/dashboard/google-reviews', [DashboardController::class, 'showReviews'])->name('google-reviews');
    Route::post('/dashboard/google-reviews/upload', [DashboardController::class, 'uploadReviews'])->name('google-reviews.upload');

    // services
    Route::get('/dashboard/services', [ServiceController::class, 'index'])->name('services.list');
    Route::get('/dashboard/services/add', [ServiceController::class, 'create'])->name('services.add');
    Route::post('/dashboard/services/add', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/dashboard/services/edit/{slug}', [ServiceController::class, 'edit'])->name('services.edit');
    Route::post('/dashboard/services/edit/{slug}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/dashboard/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');

    // lawyers
    Route::get('/dashboard/lawyers', [AttorneyController::class, 'index'])->name('lawyers.list');
    Route::get('/dashboard/lawyers/add', [AttorneyController::class, 'create'])->name('lawyers.add');
    Route::post('/dashboard/lawyers/add', [AttorneyController::class, 'store'])->name('lawyers.store');
    Route::get('/dashboard/lawyers/edit/{id}', [AttorneyController::class, 'edit'])->name('lawyers.edit');
    Route::post('/dashboard/lawyers/edit/{id}', [AttorneyController::class, 'update'])->name('lawyers.update');
    Route::delete('/dashboard/lawyers/{id}', [AttorneyController::class, 'destroy'])->name('lawyers.destroy');

    // contacts
    Route::get('/dashboard/contact', [ContactController::class, 'getContacts'])->name('contact.list');
    Route::patch('/dashboard/contact/{contact}/status', [ContactController::class, 'updateStatus'])->name('contact.update.status');

    // newsletter
    Route::get('/dashboard/newsletter', [NewsletterController::class, 'index'])->name('newsletter.list');

    // faq
    Route::get('/dashboard/faq', [FaqController::class, 'index'])->name('faq');
    Route::post('/dashboard/faq', [FaqController::class, 'store'])->name('faq.store');
    Route::put('/dashboard/faq/{id}', [FaqController::class, 'update'])->name('faq.update');
    Route::delete('/dashboard/faq/{id}', [FaqController::class, 'destroy'])->name('faq.destroy');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
