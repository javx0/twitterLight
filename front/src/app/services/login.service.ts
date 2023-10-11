import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient ) { }

  register(name:string, password:string) {
    return this.http.post<any>(this._url + "register/",{"name": name, "password":password});
  }

  login(name:string, password:string) {
    return this.http.post<any>(this._url + "login/",{"name": name, "password":password});
  }
}
