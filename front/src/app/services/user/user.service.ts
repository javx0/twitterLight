import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url = "http://127.0.0.1:8000/api/";
  
  constructor(private http:HttpClient) {

  }

  isFollowing(name:String){
    return this.http.get<boolean>(this._url + "isfollowing/" + name);
  }

  follow(name:String){
    return this.http.post<boolean>(this._url + "followuser/", {"name" : name});
  }

  getMyUser(){
    return this.http.get<string>(this._url + "getmyuser/")
  }
}
