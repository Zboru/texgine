<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Import authorization related routes
require __DIR__.'/auth.php';



Route::middleware(['auth'])->group(function() {
    Route::get('/', function () {
        return 1;
    });
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    });
});
