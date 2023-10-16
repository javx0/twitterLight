import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  postList:Post[];
  page:number;
  homeView:string;

  constructor(private postService:PostService, private activatedRoute: ActivatedRoute, private router: Router){
    this.postList = [];
    this.page = this.activatedRoute.snapshot.params['id'];
    this.homeView = "";
  }

  ngOnInit(): void{
    this.page = this.activatedRoute.snapshot.params['id'];

    if(localStorage.getItem("homeView") == "followingPost"){
      this.homeView = "followingPost";
      this.getFollowingPost();

    }else{
      this.homeView = "latestPost";
      this.getLatestPost();
    }
  }

  getMorePost(){
    this.router.navigate(['/home/' + ++this.page]);
    this.reload();
  }
  
  async reload(){
    await this.sleep(200);
    window.location.reload();
  }

  getLatestPost(){
    this.postService.getLatestPost(this.page).subscribe(response=>{
      this.postList = response;

    })
  }

  getFollowingPost(){
    this.postService.getFollowingtPost(this.page).subscribe(response=>{
      this.postList = response;

    })
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadLatestPost(){
    this.router.navigate(['/home/0']);
    localStorage.setItem("homeView", "latestPost");
    this.reload();
  }

  loadFollowingPost(){
    this.router.navigate(['/home/0']);
    localStorage.setItem("homeView", "followingPost");
    this.reload();
  }
}
