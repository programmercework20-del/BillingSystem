<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Table ka naam (optional hai kyunki Laravel by default "categories" samajh leta hai)
    protected $table = 'categories';

    // Mass assignment ke liye
    protected $fillable = [
        'name',
        'status',
    ];

   

}
