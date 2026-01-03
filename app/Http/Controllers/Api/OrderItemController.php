<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Order;

class OrderItemController extends Controller
{
    // ➕ ADD ITEM
 public function store(Request $request)
{
    $request->validate([
        'order_id'   => 'required|exists:orders,id',
        'product_id' => 'required|exists:products,id',
        'quantity'   => 'required|integer|min:1',
    ]);

    $product = Product::findOrFail($request->product_id);

    // Stock check
    if ($product->stock < $request->quantity) {
        return response()->json([
            'message' => 'Insufficient stock'
        ], 400);
    }

    // 🔍 SAME ORDER + SAME PRODUCT CHECK
    $item = OrderItem::where('order_id', $request->order_id)
        ->where('product_id', $request->product_id)
        ->first();

    if ($item) {
        // ➕ Quantity increase (NO duplicate row)
        $item->quantity += $request->quantity;
        $item->subtotal = $item->quantity * $item->unit_price;
        $item->save();
    } else {
        // ➕ New row
        $item = OrderItem::create([
            'order_id'   => $request->order_id,
            'product_id' => $request->product_id,
            'quantity'   => $request->quantity,
            'unit_price' => $product->price,
            'subtotal'   => $product->price * $request->quantity,
        ]);
    }

    // ➖ Reduce stock
    $product->decrement('stock', $request->quantity);

    // 🔁 VERY IMPORTANT (order totals update)
    $this->recalculateOrder($request->order_id);

    return response()->json([
        'success' => true,
        'data' => $item
    ], 201);
}

    // ✏ UPDATE QUANTITY
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = OrderItem::findOrFail($id);
        $product = Product::findOrFail($item->product_id);

        $diff = $request->quantity - $item->quantity;

        if ($diff > 0 && $product->stock < $diff) {
            return response()->json([
                'message' => 'Insufficient stock'
            ], 400);
        }

        // Adjust stock
        if ($diff > 0) {
            $product->decrement('stock', $diff);
        } elseif ($diff < 0) {
            $product->increment('stock', abs($diff));
        }

        $item->update([
            'quantity' => $request->quantity,
            'subtotal' => $item->unit_price * $request->quantity
        ]);

        $this->recalculateOrder($item->order_id);

        return response()->json([
            'success' => true,
            'data' => $item
        ]);
    }

    // ❌ DELETE ITEM
    public function destroy($id)
    {
        $item = OrderItem::findOrFail($id);
        $product = Product::findOrFail($item->product_id);

        // Restore stock
        $product->increment('stock', $item->quantity);

        $orderId = $item->order_id;
        $item->delete();

        $this->recalculateOrder($orderId);

        return response()->json([
            'success' => true,
            'message' => 'Item removed'
        ]);
    }

    // 🔁 RECALCULATE ORDER TOTALS
 private function recalculateOrder($orderId)
{
    $subtotal = OrderItem::where('order_id', $orderId)->sum('subtotal');

    $tax = $subtotal * 0.05; // 5% GST
    $discount = 0;
    $total = $subtotal + $tax - $discount;

    Order::where('id', $orderId)->update([
        'subtotal' => $subtotal,
        'tax'      => $tax,
        'discount' => $discount,
        'total'    => $total
    ]);
}

}
