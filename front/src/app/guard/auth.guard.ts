import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);

  authService.isUser().subscribe(result => {

  })

  if(localStorage.getItem("token")){
    return true
  }else{
    return false;
  }
};




