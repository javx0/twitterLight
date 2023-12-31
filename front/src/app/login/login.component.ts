import { Component, TemplateRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modalRef?: BsModalRef;
  public modalTitle = "";
  protected name = new FormControl();
  protected password = new FormControl();

  constructor(private loginservice:LoginService, private modalService: BsModalService, private router: Router){

  }

  ngOnInit(){
    if(localStorage.getItem("token")) this.router.navigate(['/home/0']);
  }

  openModal(template: TemplateRef<any>, title:string) {
    this.modalTitle = title;
    this.modalRef = this.modalService.show(template);
  }

  register(){
    this.loginservice.register(this.name.value, this.password.value).subscribe(response=>{
      
      localStorage.setItem("token",response.token);
      this.router.navigate(['/home/0'])
    })
    this.cleanForm();
  }

  login() {
    this.loginservice.login(this.name.value, this.password.value).subscribe(response=>{
      
      localStorage.setItem("token",response.token);
      this.router.navigate(['/home/0'])
    })
    this.cleanForm();
  }  

  cleanForm(){
    this.name.reset();
    this.password.reset();
  }
}
