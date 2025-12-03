<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        // Cart is managed on frontend with Redux
        // This just renders the cart page
        return Inertia::render('cart');
    }
}
