<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Table ka naam (optional hai kyunki Laravel by default "products" samajh leta hai)
    protected $table = 'products';

    // Mass assignment ke liye
    protected $fillable = [
        'name',
        'price',
        'category_id',
        'status',
        'tax_percent',
        'image',
    ];
   
}
