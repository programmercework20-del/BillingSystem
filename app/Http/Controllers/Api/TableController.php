<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    /**
     * GET /api/tables
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Table::orderBy('table_number')->get()
        ]);
    }

    /**
     * PUT /api/tables/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:available,occupied,reserved'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $table = Table::findOrFail($id);

        $table->status = $request->status;
        $table->save();

        return response()->json([
            'success' => true,
            'message' => 'Table status updated successfully',
            'data' => $table
        ]);
    }
}
