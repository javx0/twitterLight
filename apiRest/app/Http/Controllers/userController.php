<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class userController extends Controller
{
    public function followUser(Request $request){

        $userFollowing = auth()->user();
        $userFollowed = User::firstWhere('name', $request -> name);

        if(
            Follower::where('id_user_followed', ($userFollowed -> id) . "")
             ->where('id_user_following', ($userFollowing -> id) . "")
             ->first()
        )
        {
            DB::table('followers')
            ->where('id_user_followed', ($userFollowed -> id) . "")
            ->where('id_user_following', ($userFollowing -> id) . "")
            ->delete();   
            return response() -> json("unfollow");
        }
        else{
            Follower::create([
                "id_user_followed" => ($userFollowed -> id) . "",
                "id_user_following" => ($userFollowing -> id) . "",
            ]
            );
            return response() -> json("followed");
        }   
    }

    public function isFollowing(Request $request){
        $userFollowing = auth()->user();
        $userFollowed = User::firstWhere('name', $request -> name);

        if(
            Follower::where('id_user_followed', ($userFollowed -> id) . "")
             ->where('id_user_following', ($userFollowing -> id) . "")
             ->first()
        )
        {
            return "true";
        }else{
            return "false";
        }
    }

    public function getMyUser(){
        $user = auth()->user();
        return response() -> json($user -> name);
    }

}
