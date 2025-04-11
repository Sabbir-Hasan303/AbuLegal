<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
// use Illuminate\Support\Facades\Route;
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\PHP_VERSION;
use App\Models\Service;
use App\Models\Faq;
use App\Models\Attorney;
class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::with(['services' => function($query) {
            $query->where('status', 'active')
                 ->take(4);
        }])->whereHas('services', function($query) {
            $query->where('status', 'active');
        })->get();

        $faqs = Faq::all();

        $attorneys = Attorney::all();

        $attorneys->each(function ($attorney) {
            $attorney->specialties = json_decode($attorney->specialties);
            $attorney->social_media = json_decode($attorney->social_media);
        });

        // dd($attorneys);

        return Inertia::render('Home', [
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
            'serviceCategories' => $categories,
            'faqs' => $faqs,
            'attorneys' => $attorneys
        ]);
    }

    public function getMainServices()
    {
        $services = Service::with('category')
            ->where('status', 'active')
            ->take(4)
            ->get();

        return response()->json($services);
    }

    // About Page
    public function about()
    {
        return Inertia::render('About');
    }
}
