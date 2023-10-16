import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  name:string;
  postList:Post[];
  followed:boolean;

  constructor(private activatedRoute: ActivatedRoute,private postService:PostService, private userService:UserService){
    this.name = this.activatedRoute.snapshot.params['name'];
    this.postList = [];
    this.followed = false;
  }

  ngOnInit(): void{
    this.getAllUserPost();
    this.name = this.activatedRoute.snapshot.params['name'];
    this.isFollowed()
  }
  
  getAllUserPost(){
    this.postService.getUserPosts(this.name).subscribe(response=>{
      this.postList = response;
    })
  }

  follow(){
    this.followed = !this.followed
    this.userService.follow(this.name).subscribe(response=>{
      this.isFollowed();
    })
  }

  isFollowed(){
    this.userService.isFollowing(this.name).subscribe(response=>{
      this.followed = response;
    })
  }
}
