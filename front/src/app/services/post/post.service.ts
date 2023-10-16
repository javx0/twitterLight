import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _url = "http://127.0.0.1:8000/api/";
  
  constructor(private http:HttpClient) {

   }

  createPost(text:String){
    return this.http.post<Post>(this._url + "createpost/", {"text": text});
  }

  getLatestPost(page:number){
    return this.http.get<Post[]>(this._url + "getlatestposts/" + page);
  }

  getFollowingtPost(page:number){
    return this.http.get<Post[]>(this._url + "getfollowingpost/" + page);
  }

  getUserPosts(name:string){
    return this.http.get<Post[]>(this._url + "getalluserpost/" + name);
  }

  deletePost(id:number){
    return this.http.post<any>(this._url + "deletePost/", id + "" );
  }
}
