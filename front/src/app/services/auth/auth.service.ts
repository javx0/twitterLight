import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url = "http://127.0.0.1:8000/api/";
  
  constructor(private http:HttpClient) {

   }

   isUser() {
    return this.http.post<String>(this._url + "isuser/","");
  }


}
