<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug'];

    public function services()
    {
        return $this->hasMany(Service::class, 'category');
    }

    public function successStories()
    {
        return $this->hasMany(SuccessStory::class, 'category');
    }
}
