<?php

use App\Http\Controllers\Admin\BuyerRequestController as AdminBuyerRequestController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\SlideController as AdminSlideController;
use App\Http\Controllers\Admin\SupplierController as AdminSupplierController;
use App\Http\Controllers\Buyer\DashboardController as BuyerDashboardController;
use App\Http\Controllers\Buyer\ProfileController as BuyerProfileController;
use App\Http\Controllers\Buyer\ListsController as BuyerListsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Marketplace\BuyerRequestController;
use App\Http\Controllers\Marketplace\SupplierController;
use App\Http\Controllers\Marketplace\CategoryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Supplier\DashboardController as SupplierDashboardController;
use App\Http\Controllers\Supplier\ProfileController as SupplierProfileController;
use App\Http\Controllers\Supplier\RfqController as SupplierRfqController;
use App\Http\Controllers\Supplier\ResponseController as SupplierResponseController;
use App\Http\Controllers\Supplier\OrderController as SupplierOrderController;
use App\Http\Controllers\Supplier\SubscriptionController as SupplierSubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/about', function () {
    return \Inertia\Inertia::render('about');
})->name('about');
Route::get('/pricing', function () {
    return \Inertia\Inertia::render('pricing');
})->name('pricing');

Route::get('pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');

Route::get('categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::get('suppliers/{supplierProfile:slug}', [SupplierController::class, 'show'])->name('suppliers.show');

Route::get('requests/{buyerRequest:slug}', [BuyerRequestController::class, 'show'])->name('requests.show');

Route::middleware(['auth'])->group(function () {
    // Redirect to appropriate dashboard based on role
    Route::get('dashboard', function () {
        $user = auth()->user();
        $role = $user->role ?? 'buyer';
        
        return match($role) {
            'admin' => redirect()->route('admin.dashboard'),
            'supplier' => redirect()->route('supplier.dashboard'),
            default => redirect()->route('buyer.dashboard')
        };
    })->name('dashboard');

    // Buyer routes
    Route::middleware('role:buyer')->prefix('buyer')->name('buyer.')->group(function () {
        Route::get('dashboard', [BuyerDashboardController::class, 'index'])->name('dashboard');
        Route::get('profile', [BuyerProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [BuyerProfileController::class, 'update'])->name('profile.update');
        
        // Request routes
        Route::get('requests/create', [BuyerRequestController::class, 'create'])->name('requests.create');
        Route::post('requests', [BuyerRequestController::class, 'store'])->name('requests.store');
        Route::get('requests/{buyerRequest}/edit', [BuyerRequestController::class, 'edit'])->name('requests.edit');
        Route::put('requests/{buyerRequest}', [BuyerRequestController::class, 'update'])->name('requests.update');
        Route::delete('requests/{buyerRequest}', [BuyerRequestController::class, 'destroy'])->name('requests.destroy');
        
        // Lists routes
        Route::get('active-requests', [BuyerListsController::class, 'activeRequests'])->name('active-requests');
        Route::get('supplier-contacts', [BuyerListsController::class, 'supplierContacts'])->name('supplier-contacts');
        Route::get('completed-orders', [BuyerListsController::class, 'completedOrders'])->name('completed-orders');
    });

    // Supplier routes
    Route::middleware('role:supplier')->prefix('supplier')->name('supplier.')->group(function () {
        Route::get('dashboard', [SupplierDashboardController::class, 'index'])->name('dashboard');
        Route::get('profile', [SupplierProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [SupplierProfileController::class, 'update'])->name('profile.update');
        
        // RFQ routes
        Route::get('rfqs', [SupplierRfqController::class, 'index'])->name('rfqs');
        Route::get('rfqs/{buyerRequest}', [SupplierRfqController::class, 'show'])->name('rfqs.show');
        Route::post('rfqs/{buyerRequest}/respond', [SupplierRfqController::class, 'respond'])->name('responses.store');
        
        // Response routes
        Route::get('responses', [SupplierResponseController::class, 'index'])->name('responses');
        Route::get('responses/{response}', [SupplierResponseController::class, 'show'])->name('responses.show');
        Route::get('responses/{response}/edit', [SupplierResponseController::class, 'edit'])->name('responses.edit');
        Route::put('responses/{response}', [SupplierResponseController::class, 'update'])->name('responses.update');
        Route::delete('responses/{response}', [SupplierResponseController::class, 'destroy'])->name('responses.destroy');
        
        // Order routes
        Route::get('orders', [SupplierOrderController::class, 'index'])->name('orders');
        Route::get('orders/{order}', [SupplierOrderController::class, 'show'])->name('orders.show');
        
        // Subscription routes
        Route::get('subscription', [SupplierSubscriptionController::class, 'index'])->name('subscription');
        Route::get('subscription/checkout', [SupplierSubscriptionController::class, 'checkout'])->name('subscription.checkout');
        Route::post('subscription', [SupplierSubscriptionController::class, 'store'])->name('subscription.store');
        Route::post('subscription/activate', [SupplierSubscriptionController::class, 'activate'])->name('subscription.activate');
        Route::post('subscription/cancel', [SupplierSubscriptionController::class, 'cancel'])->name('subscription.cancel');
    });

    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
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


