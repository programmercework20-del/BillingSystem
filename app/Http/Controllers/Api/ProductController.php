<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * GET /api/products
     * Optional filter: ?category=mains
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // 🔹 category filter (slug based)
        if ($request->has('category')) {
            $query->where('category_slug', $request->category);
        }

        // 🔹 optional: hide out of stock (agar chaho)
        // $query->where('stock', '>', 0);

        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }
}
