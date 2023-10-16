<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function createPost(Request $request){

        $user = auth()->user();

        $this->validate($request,[
            "text" => "required|max:255"
        ]
        );
        
        Post::create([
            "text" => $request -> text,
            "id_user" => ($user -> id) . "",
        ]
        );
    }

    public function deletePost(Request $request){
        
        $user = auth()->user();

        $this->validate($request,[
            "id" => "required"
        ]
        );

        $post = Post::find(($request -> id) . "");

        if($post -> id_user == $user -> id){
            $post ->delete();
            return response("deleted");
        };

    }

    public function getAllUserPost(Request $request){
        
        $myPosts = DB::table('posts')
                        ->join('users', 'users.id', '=', 'posts.id_user')
                        ->select('posts.text', 'posts.created_at','users.name AS userName' )
                        ->where('users.name', $request -> name . "")
                        ->latest()
                        ->get();

        return response() -> json($myPosts);
    }

    public function getLatestPost(Request $request){

        $page = ($request -> page) *10;
        
        $myPosts = DB::table('posts')
                        ->join('users', 'users.id', '=', 'posts.id_user')
                        ->select('posts.text', 'posts.created_at','users.name AS userName' )
                        ->latest()
                        ->skip($page)
                        ->take(10)
                        ->get();

        return response() -> json($myPosts);
    }

    public function getFollowingPost(Request $request){

        $page = ($request -> page) *10;

        $user = auth()->user();

        $followingPosts = DB::table('users')
                        ->join('followers', 'followers.id_user_followed', '=', 'users.id')
                        ->join('posts', 'posts.id_user', '=', 'users.id')
                        ->select('posts.text', 'posts.created_at','users.name AS userName' )
                        ->where('followers.id_user_following', $user -> id . "")
                        ->latest()
                        ->skip($page)
                        ->take(10)
                        ->get();

        return response() -> json($followingPosts);
    }
}
