<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    // Table ka naam (optional hai kyunki Laravel by default "tables" samajh leta hai)
    protected $table = 'tables';

    // Mass assignment ke liye
    protected $fillable = [
        'table_number',
        'status',
        'capacity',
    ];
   
}
