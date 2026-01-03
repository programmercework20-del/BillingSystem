<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * 🔹 GET /api/categories
     * Active categories list
     */
    public function index()
    {
        $categories = Category::where('status', 1)
            ->orderBy('id', 'ASC')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * 🔹 POST /api/categories
     * Create new category
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'   => 'required|string|max:455',
            'status' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $category = Category::create([
            'name'   => $request->name,
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data'    => $category
        ], 201);
    }

    /**
     * 🔹 GET /api/categories/{id}
     * Single category
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * 🔹 PUT /api/categories/{id}
     * Update category
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'   => 'required|string|max:455',
            'status' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $category->update([
            'name'   => $request->name,
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data'    => $category
        ]);
    }

    /**
     * 🔹 DELETE /api/categories/{id}
     * Soft delete via status
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $category->update([
            'status' => 0
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
