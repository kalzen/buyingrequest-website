<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$router = $app['router'];
$route = $router->getRoutes()->getByName('login');
var_dump($route?->uri());
