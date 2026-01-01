<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Table ka naam (optional hai kyunki Laravel by default "order_items" samajh leta hai)
    protected $table = 'order_items';

    // Mass assignment ke liye
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
        'subtotal',
    ];
   
}
