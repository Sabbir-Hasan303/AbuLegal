<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use App\Mail\NewsletterThankYou;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Newsletter::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('email', 'like', "%{$search}%");
        }

        $newsletters = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Dashboard/NewsletterList', [
            'newsletters' => $newsletters,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'email' => 'required|email|unique:newsletters',
        ]);

        $newsletter = Newsletter::create($request->all());

        // Send thank you email
        Mail::to($newsletter->email)->send(new NewsletterThankYou($newsletter->email));

        return redirect()->back()->with('success', 'You have successfully subscribed to our newsletter');
    }

    /**
     * Display the specified resource.
     */
    public function show(Newsletter $newsletter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Newsletter $newsletter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Newsletter $newsletter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Newsletter $newsletter)
    {
        //
    }
}
