<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    // DB me timestamps hain
    public $timestamps = true;

    protected $fillable = [
        'name',
        'category_slug',
        'price',
        'stock',
        'image',
        'image_alt',
        'reorder_point',
        'status'
    ];
}
