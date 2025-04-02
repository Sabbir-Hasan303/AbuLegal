<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);

        $services = Service::with('category')
            ->filter($filters)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Services/ServicesList', [
            'services' => $services,
            'filters' => $filters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/Services/AddService', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|exists:categories,id',
                'short_description' => 'required|string|max:150',
                'description' => 'required|string',
                'status' => 'required|in:active,draft',
                'banner' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ], [
                'title.required' => 'The service title is required.',
                'category.required' => 'Please select a category.',
                'category.exists' => 'The selected category is invalid.',
                'short_description.required' => 'The short description is required.',
                'short_description.max' => 'The short description must not exceed 150 characters.',
                'description.required' => 'The full description is required.',
                'status.required' => 'Please select a status.',
                'status.in' => 'The selected status is invalid.',
                'banner.required' => 'A banner image is required.',
                'banner.image' => 'The banner must be an image file.',
                'banner.mimes' => 'The banner must be a file of type: jpeg, png, jpg, gif.',
                'banner.max' => 'The banner must not be larger than 2MB.'
            ]);

            $service = new Service();
            $service->title = $request->title;
            $service->slug = str()->slug($request->title);
            $service->category = $request->category;
            $service->short_description = $request->short_description;
            $service->description = $request->description;
            $service->status = $request->status;

            if ($request->hasFile('banner')) {
                $banner = $request->file('banner');
                $filename = time() . '_' . $banner->getClientOriginalName();
                Storage::disk('public')->put('services/' . $filename, file_get_contents($banner));
                $imageLink = 'storage/services/' . $filename;
                $service->banner = $imageLink;
            }

            $service->save();

            return redirect()->route('services.list')->with('success', 'Service created successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred while creating the service. Please try again.')->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();
        $categories = Category::all();

        return Inertia::render('Dashboard/Services/EditService', [
            'service' => $service,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        try {
            $service = Service::where('slug', $slug)->firstOrFail();

            $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|exists:categories,id',
                'short_description' => 'required|string|max:150',
                'description' => 'required|string',
                'status' => 'required|in:active,draft',
                'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ], [
                'title.required' => 'The service title is required.',
                'category.required' => 'Please select a category.',
                'category.exists' => 'The selected category is invalid.',
                'short_description.required' => 'The short description is required.',
                'short_description.max' => 'The short description must not exceed 150 characters.',
                'description.required' => 'The full description is required.',
                'status.required' => 'Please select a status.',
                'status.in' => 'The selected status is invalid.',
                'banner.image' => 'The banner must be an image file.',
                'banner.mimes' => 'The banner must be a file of type: jpeg, png, jpg, gif.',
                'banner.max' => 'The banner must not be larger than 2MB.'
            ]);

            $service->title = $request->title;
            $service->slug = str()->slug($request->title);
            $service->category = $request->category;
            $service->short_description = $request->short_description;
            $service->description = $request->description;
            $service->status = $request->status;

            if ($request->hasFile('banner')) {
                // Delete old banner if exists
                if ($service->banner) {
                    $oldPath = str_replace('storage/', '', $service->banner);
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                $banner = $request->file('banner');
                $filename = time() . '_' . $banner->getClientOriginalName();
                Storage::disk('public')->put('services/' . $filename, file_get_contents($banner));
                $imageLink = 'storage/services/' . $filename;
                $service->banner = $imageLink;
            }

            $service->save();

            return redirect()->route('services.list')->with('success', 'Service updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred while updating the service. Please try again.')->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $service = Service::findOrFail($id);

            // Delete the banner image if it exists
            if ($service->banner) {
                $bannerPath = str_replace('storage/', '', $service->banner);
                if (Storage::disk('public')->exists($bannerPath)) {
                    Storage::disk('public')->delete($bannerPath);
                }
            }

            $service->delete();

            return redirect()->route('services.list')->with('success', 'Service deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred while deleting the service. Please try again.');
        }
    }
}
