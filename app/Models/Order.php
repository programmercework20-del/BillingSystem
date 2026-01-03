<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
 public $timestamps = false; 
    protected $fillable = [
        'order_number',
        'table_id',
        'order_type',
        'status',
        'subtotal',
        'tax',
        'discount',
        'total'
    ];

    // 🔗 Relationship: Order belongs to Table
    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    // 🔗 Relationship: Order has many OrderItems
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
