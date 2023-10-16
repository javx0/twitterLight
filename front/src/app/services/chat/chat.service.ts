import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  _url = "http://127.0.0.1:8000/api/";
  
  constructor(private http:HttpClient) {

   }

  createChat(chatName:String){
    alert(chatName);
    return this.http.post(this._url + "createchat/", {"chatName": chatName});
  }

  addUserToChat(id_chat:Number, userName:String){
    return this.http.post(this._url + "addusertochat/", {"id_chat": id_chat, "userName": userName});
  }

  sendMessage(id_chat:Number, text:String){
    return this.http.post(this._url + "sendmessage/", {"id_chat": id_chat, "text": text});
  }

  getChats(){
    return this.http.get<Chat[]>(this._url + "getchats/");
  }

  getChatMessages(id_chat:Number){
    return this.http.get<Message[]>(this._url + "getchatmessages/" + id_chat);
  }
}
