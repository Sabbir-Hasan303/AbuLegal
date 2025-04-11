<?php

namespace App\Http\Controllers;

use App\Models\Attorney;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AttorneyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attorneys = Attorney::all();

        $attorneys->each(function ($attorney) {
            $attorney->specialties = json_decode($attorney->specialties);
            $attorney->social_media = json_decode($attorney->social_media);
        });
        return Inertia::render('Dashboard/Attorneys/AttorneysList', ['attorneys' => $attorneys]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Attorneys/AddAttorney');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:attorneys',
                'phone' => 'nullable',
                'role' => 'required',
                'specialties' => 'required',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $attorney = new Attorney();
            $attorney->name = $request->name;
            $attorney->email = $request->email;
            $attorney->phone = $request->phone;
            $attorney->role = $request->role;
            $attorney->specialties = json_encode($request->specialties);
            $attorney->social_media = json_encode($request->social_media);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                Storage::disk('public')->put('attorneys/' . $filename, file_get_contents($image));
                $imageLink = 'attorneys/' . $filename;
                $attorney->image = $imageLink;
            }

            $attorney->save();

            return redirect()->route('attorneys.list')->with('success', 'Attorney created successfully');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->route('attorneys.add')->with('error', 'Failed to create attorney');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attorney $attorney)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $attorney = Attorney::find($id);
        $attorney->specialties = json_decode($attorney->specialties);
        $attorney->social_media = json_decode($attorney->social_media);
        return Inertia::render('Dashboard/Attorneys/EditAttorney', ['attorney' => $attorney]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:attorneys,email,' . $id,
                'phone' => 'nullable',
                'role' => 'required',
                'specialties' => 'required|array',
                'social_media' => 'required|array',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $attorney = Attorney::find($id);
            $attorney->name = $request->name;
            $attorney->email = $request->email;
            $attorney->phone = $request->phone;
            $attorney->role = $request->role;
            $attorney->specialties = json_encode($request->specialties);
            $attorney->social_media = json_encode($request->social_media);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                Storage::disk('public')->put('attorneys/' . $filename, file_get_contents($image));
                $imageLink = 'attorneys/' . $filename;
                $attorney->image = $imageLink;
            }

            $attorney->save();

            return redirect()->route('attorneys.list')->with('success', 'Attorney updated successfully');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->route('attorneys.edit', $id)->with('error', 'Failed to update attorney');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attorney $attorney)
    {
        //
    }
}
