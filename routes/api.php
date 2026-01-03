<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\API\TableController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;
use App\Http\Controllers\API\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Ye routes React (Vite) frontend ke liye hain
| Base URL: http://localhost/api/....
|--------------------------------------------------------------------------
*/

// --------------------
// TABLES (Dining Tables)
// --------------------
Route::get('/tables', [TableController::class, 'index']);
Route::put('/tables/{id}/status', [TableController::class, 'updateStatus']);


// --------------------
// PRODUCTS (Menu Items)
// --------------------
Route::get('/products', [ProductController::class, 'index']);


// --------------------
// ORDERS
// --------------------
Route::post('/orders', [OrderController::class, 'store']);        // create order
Route::put('/orders/{id}/complete', [OrderController::class, 'complete']);


// --------------------
// ORDER ITEMS (Cart)
// --------------------
Route::post('/order-items', [OrderItemController::class, 'store']);
Route::put('/order-items/{id}', [OrderItemController::class, 'update']);
Route::delete('/order-items/{id}', [OrderItemController::class, 'destroy']);


// --------------------
// AUTH (Future use)
// --------------------
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// --------------------
//Category Api
// --------------------

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);