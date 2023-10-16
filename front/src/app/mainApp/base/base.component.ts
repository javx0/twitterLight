import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent {
  modalRef?: BsModalRef;
  protected text = new FormControl();

  constructor(private modalService: BsModalService, private router: Router, private postService: PostService){

  }

  ngOnInit(){
    if(this.router.url == "/") this.router.navigate(['/home/0']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  async goHome(){
    this.router.navigate(['/home/0']);
    await this.sleep(200);
    window.location.reload();
  }

  goMessages(){
    this.router.navigate(['/messages'])
  }

  createPost(){
    this.postService.createPost(this.text.value).subscribe(response=>{
      window.location.reload();
    })
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
