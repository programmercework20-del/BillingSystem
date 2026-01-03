<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Table;

class OrderController extends Controller
{
    // 🟢 CREATE ORDER
    public function store(Request $request)
    {
        $request->validate([
            'order_type' => 'required|in:dine_in,takeaway',
            'table_id'   => 'nullable|exists:tables,id'
        ]);

        // 🔢 Generate Order Number
        $orderNumber = 'ORD-' . date('Ymd') . '-' . str_pad(
            Order::count() + 1,
            3,
            '0',
            STR_PAD_LEFT
        );

        $order = Order::create([
            'order_number' => $orderNumber,
            'table_id'     => $request->table_id,
            'order_type'   => $request->order_type,
            'status'       => 'pending',
            'subtotal'     => 0,
            'tax'          => 0,
            'discount'     => 0,
            'total'        => 0
        ]);

        // 🪑 Dine-in hai to table occupied karo
        if ($request->order_type === 'dine_in' && $request->table_id) {
            Table::where('id', $request->table_id)
                ->update(['status' => 'occupied']);
        }

        return response()->json([
            'success' => true,
            'order'   => $order
        ]);
    }

    // 🟢 COMPLETE ORDER
    public function complete($id)
    {
        $order = Order::findOrFail($id);

        $order->update(['status' => 'completed']);

        // 🪑 Table free karo
        if ($order->table_id) {
            Table::where('id', $order->table_id)
                ->update(['status' => 'available']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order completed successfully'
        ]);
    }
}
