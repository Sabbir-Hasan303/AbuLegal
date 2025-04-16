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
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:attorneys',
                'phone' => 'nullable',
                'role' => 'required',
                'specialties' => 'required',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $attorney = new Attorney();
            $attorney->name = $validated['name'];
            $attorney->email = $validated['email'];
            $attorney->phone = $validated['phone'];
            $attorney->role = $validated['role'];
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create attorney: ' . $e->getMessage())->withInput();
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
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:attorneys,email,' . $id,
                'phone' => 'nullable',
                'role' => 'required',
                'specialties' => 'required|array',
                'social_media' => 'required|array',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $attorney = Attorney::find($id);
            $attorney->name = $validated['name'];
            $attorney->email = $validated['email'];
            $attorney->phone = $validated['phone'];
            $attorney->role = $validated['role'];
            $attorney->specialties = json_encode($request->specialties);
            $attorney->social_media = json_encode($request->social_media);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                // delete the old image
                $oldImage = $attorney->getRawOriginal('image');
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
                $filename = time() . '_' . $image->getClientOriginalName();
                Storage::disk('public')->put('attorneys/' . $filename, file_get_contents($image));
                $imageLink = 'attorneys/' . $filename;
                $attorney->image = $imageLink;
            }

            $attorney->save();

            return redirect()->route('attorneys.list')->with('success', 'Attorney updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update attorney: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $attorney = Attorney::findOrFail($id);

            if ($attorney->getRawOriginal('image')) {
                $imagePath = $attorney->getRawOriginal('image');
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }
            $attorney->delete();
            return redirect()->route('attorneys.list')->with('success', 'Attorney deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('attorneys.list')->with('error', 'Failed to delete attorney');
        }
    }
}
