<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'banner',
        'category',
        'short_description',
        'description',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category');
    }
}
