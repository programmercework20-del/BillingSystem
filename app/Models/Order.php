<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Table ka naam (optional hai kyunki Laravel by default "orders" samajh leta hai)
    protected $table = 'orders';

    // Mass assignment ke liye
    protected $fillable = [
        'table_id',
        'order_number',
        'total_amount',
        'tax_amount',
        'discount',
        'grand_total',
        'payment_status',
        'payment_mode',
       
    ];

   }
