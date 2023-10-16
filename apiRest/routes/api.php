<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Routes unprotected
Route::post("register",[AuthController::class,"register"]);
Route::post("login",[AuthController::class,"login"]);


//Routes protected by jwt
Route::middleware("jwt.verify")->group(function(){
    Route::post("isuser",[AuthController::class,"isUser"]);

    Route::post("createpost",[PostController::class, "createPost"]);
    Route::delete("deletepost",[PostController::class, "deletePost"]);

    Route::get("getalluserpost/{name}",[PostController::class, "getAllUserPost"]);
    Route::get("getlatestposts/{page}",[PostController::class, "getLatestPost"]);
    Route::get("getfollowingpost/{page}",[PostController::class, "getFollowingPost"]);

    Route::post("followuser",[userController::class, "followUser"]);
    Route::get("isfollowing/{name}",[userController::class, "isFollowing"]);
    Route::get("getmyuser/",[userController::class, "getMyUser"]);

    #CHAT ROUTES
    Route::post("createchat/",[ChatController::class, "createChat"]);
    Route::post("addusertochat/",[ChatController::class, "addUserToChat"]);
    Route::post("sendmessage/",[ChatController::class, "sendMessage"]);
    Route::get("getchats/",[ChatController::class, "getChats"]);
    Route::get("getchatmessages/{idChat}",[ChatController::class, "getChatMessages"]);
    
});