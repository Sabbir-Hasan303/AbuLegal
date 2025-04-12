<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use App\Models\Attorney;
use App\Models\Contact;
use App\Models\Newsletter;
use App\Models\Option;

class DashboardController extends Controller
{
    public function index()
    {
        $services = Service::count();
        $attorneys = Attorney::count();
        $contacts = Contact::count();
        $newsletters = Newsletter::count();

        return Inertia::render('Dashboard/Dashboard', [
            'services' => $services,
            'attorneys' => $attorneys,
            'contacts' => $contacts,
            'newsletters' => $newsletters,
        ]);
    }

    public function showReviews()
    {
        $googleReviews = Option::where('key', 'google_reviews')->first();
        $reviews = $googleReviews ? json_decode($googleReviews->value, true) : [];

        return Inertia::render('Dashboard/GoogleReviews', [
            'reviews' => $reviews,
        ]);
    }

    public function uploadReviews(Request $request)
    {
        $request->validate([
            'json_file' => 'required|file|mimes:json|max:10240', // Max 10MB
        ]);

        $file = $request->file('json_file');
        $jsonContent = file_get_contents($file->getPathname());
        $data = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return redirect()->back()->with('error', 'Invalid JSON file format.');
        }

        $extractedReviews = [];

        // Extract the required data from the JSON
        foreach ($data as $review) {
            if (isset($review['reviewerPhotoUrl'], $review['name'], $review['text'], $review['stars'], $review['categoryName'])) {
                $extractedReviews[] = [
                    'reviewerPhotoUrl' => $review['reviewerPhotoUrl'],
                    'name' => $review['name'],
                    'text' => $review['text'],
                    'stars' => $review['stars'],
                    'categoryName' => $review['categoryName'],
                ];
            }
        }

        // Save to options table
        Option::updateOrCreate(
            ['key' => 'google_reviews'],
            ['value' => json_encode($extractedReviews)]
        );

        return redirect()->back()->with('success', 'Google Reviews uploaded successfully.');
    }
}
