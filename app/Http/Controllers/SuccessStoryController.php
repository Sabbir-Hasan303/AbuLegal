<?php

namespace App\Http\Controllers;

use App\Models\SuccessStory;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SuccessStoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $successStories = SuccessStory::with('category')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard/SuccessStories/Index', [
            'successStories' => $successStories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/SuccessStories/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|exists:categories,id',
                'client_name' => 'required|string|max:255',
                'date' => 'required|date',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'outcome' => 'required|string',
                'quote' => 'required|string',
                'key_metric' => 'required|string|max:255',
                'key_metric_label' => 'required|string|max:255',
                'key_metric_icon' => 'required|string|max:255',
            ]);

            $successStory = new SuccessStory();

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                Storage::disk('public')->put('success-stories/' . $filename, file_get_contents($image));
                $imageLink = 'storage/success-stories/' . $filename;
                $successStory->image = $imageLink;
            }

            $successStory->title = $request->title;
            $successStory->category = $request->category;
            $successStory->client_name = $request->client_name;
            $successStory->date = $request->date;
            $successStory->outcome = $request->outcome;
            $successStory->quote = $request->quote;
            $successStory->key_metric = $request->key_metric;
            $successStory->key_metric_label = $request->key_metric_label;
            $successStory->key_metric_icon = $request->key_metric_icon;

            $successStory->save();

            return redirect()->route('success-stories.list')->with('success', 'Success story created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('success-stories.list')->with('error', 'Failed to create success story.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories = Category::all();
        $successStory = SuccessStory::with('category')->find($id);
        return Inertia::render('Dashboard/SuccessStories/Edit', [
            'successStory' => $successStory,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        try {
            $validated = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'category' => 'required|exists:categories,id',
                'client_name' => 'required|string|max:255',
                'date' => 'required|date',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'outcome' => 'required|string',
                'quote' => 'required|string',
                'key_metric' => 'required|string|max:255',
                'key_metric_label' => 'required|string|max:255',
                'key_metric_icon' => 'required|string|max:255',
            ]);

            // if validation fails, return to the edit page with the errors
            if ($validated->fails()) {
                return redirect()->route('success-stories.edit', $id)->with('error', 'Failed to update success story.');
            }

            $successStory = SuccessStory::find($id);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $oldPath = str_replace('/storage/', '', $successStory->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                $filename = time() . '_' . $image->getClientOriginalName();
                Storage::disk('public')->put('success-stories/' . $filename, file_get_contents($image));
                $imageLink = 'storage/success-stories/' . $filename;
                $successStory->image = $imageLink;
            }

            $successStory->title = $request->title;
            $successStory->category = $request->category;
            $successStory->client_name = $request->client_name;
            $successStory->date = $request->date;
            $successStory->outcome = $request->outcome;
            $successStory->quote = $request->quote;
            $successStory->key_metric = $request->key_metric;
            $successStory->key_metric_label = $request->key_metric_label;
            $successStory->key_metric_icon = $request->key_metric_icon;

            $successStory->save();

            return redirect()->route('success-stories.list')->with('success', 'Success story updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('success-stories.list')->with('error', 'Failed to update success story.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $successStory = SuccessStory::find($id);
        // Delete image
        if ($successStory->image) {
            $oldPath = str_replace('/storage/', '', $successStory->image);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $successStory->delete();

        return redirect()->route('success-stories.list')->with('success', 'Success story deleted successfully.');
    }
}
