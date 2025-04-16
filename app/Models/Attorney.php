<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attorney extends Model
{
    protected $fillable = [
        'name',
        'image',
        'email',
        'phone',
        'role',
        'specialties',
        'social_media',
    ];

    protected $casts = [
        'specialties' => 'array',
        'social_media' => 'array',
    ];

    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getSocialMediaAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getSpecialtiesAttribute($value)
    {
        return json_decode($value, true);
    }
}
