<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use App\Models\Attorney;
use App\Models\Contact;
use App\Models\Newsletter;

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
}
