<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Chat_participants;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    function createChat(Request $request){

        $user = auth()->user();

        $this->validate($request,[
            "chatName" => "required|max:50"
        ]);

        $chat = Chat::Create([
            "name" => $request -> chatName
        ]);

        Chat_participants::Create([
            "id_user" => ($user -> id) . "",
            "id_chat" => ($chat -> id) . "",
        ]);

    }

    function addUserToChat(Request $request){

        $user = User::where('name', $request -> userName)->first();

        Chat_participants::create([
            "id_user" => ($user -> id) . "",
            "id_chat" => ($request -> id_chat) . "",
        ]
        );
    }

    function sendMessage(Request $request){
        
        $this->validate($request,[
            "text" => "required|max:255"
        ]);

        $user = auth()->user();
        
        Message::create([
            "text" => ($request -> text) . "",
            "id_chat" => ($request -> id_chat) . "",
            "id_user" => ($user -> id) . ""
        ]);
    }

    public function getChats(){
        $user = auth()->user();

        $myChats = DB::table('chat_participants')
            ->join('chats', 'chats.id', '=', 'chat_participants.id_chat')
            ->select('chats.id', 'chats.name')
            ->where('chat_participants.id_user', ($user -> id) . "")
            ->get();
        
        return response() -> json($myChats);
    }

    public function getChatMessages(Request $request){

        $messages = DB::table('messages')
            ->join('users', 'users.id', '=', 'messages.id_user')
            ->select('messages.text', 'users.name AS userName', 'messages.created_at')
            ->where('messages.id_chat', ($request -> idChat) . "")
            ->latest()
            ->get();

        return response() -> json($messages);
    }
}
