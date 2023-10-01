<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Contracts\Service\Attribute\Required;



class AuthController extends Controller
{
    public function register(Request $request){
        $this->validate($request,[
            "name" => "required|max:50|unique:users",
            "password" => "required|min:6",
        ]
        );

        $user = User::create([
            "name" => $request -> name,
            "password" => Hash::make($request -> password),
        ]
        );

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "token" => $token
        ],201);
    }

    public function login(LoginRequest $request){

        $credentials = $request-> only("name", "password");

        try{
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    "error" => "token not found"
                ], 500);
            }

        }catch(JWTException $e){
            return response() -> json([
                'error' => 'not created token'
            ],500);
        }
        
        return response()->json(compact("token"));
    }
}
