<?php

use App\Http\Controllers\Admin\BuyerRequestController as AdminBuyerRequestController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\SlideController as AdminSlideController;
use App\Http\Controllers\Admin\SupplierController as AdminSupplierController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Marketplace\BuyerRequestController;
use App\Http\Controllers\Marketplace\SupplierController;
use App\Http\Controllers\Marketplace\CategoryController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');

Route::get('categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::get('suppliers/{supplierProfile:slug}', [SupplierController::class, 'show'])->name('suppliers.show');

Route::get('requests/{buyerRequest:slug}', [BuyerRequestController::class, 'show'])->name('requests.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware('can:access-admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', DashboardController::class)->name('dashboard');

        Route::resource('pages', AdminPageController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('slides', AdminSlideController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('buyer-requests', AdminBuyerRequestController::class)->only(['index', 'update', 'destroy']);
        Route::resource('suppliers', AdminSupplierController::class)->only(['index', 'update']);

        Route::get('media', [AdminMediaController::class, 'index'])->name('media.index');
        Route::post('media/folders', [AdminMediaController::class, 'storeFolder'])->name('media.folders.store');
        Route::post('media/uploads', [AdminMediaController::class, 'upload'])->name('media.uploads.store');
        Route::delete('media/files/{mediaFile}', [AdminMediaController::class, 'destroyFile'])->name('media.files.destroy');
        Route::delete('media/folders/{mediaFolder}', [AdminMediaController::class, 'destroyFolder'])->name('media.folders.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


