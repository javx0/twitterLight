<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Routes unprotected
Route::post("register",[AuthController::class,"register"]);
Route::post("login",[AuthController::class,"login"]);


//Routes protected by jwt
Route::middleware("jwt.verify")->group(function(){
    Route::post("isuser",[AuthController::class,"isUser"]);
});