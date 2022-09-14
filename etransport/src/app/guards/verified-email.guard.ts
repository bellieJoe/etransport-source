import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedEmailGuard implements CanActivate {

  constructor(
    private userService : UserService,
    private router : Router
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
    const user = JSON.parse(localStorage.getItem('user'));
    const verified = await this.userService.isVerified(user.user_id);
    
    if(!verified){
      return this.router.createUrlTree(['/verify-email']);
    }

    return true;
  }
  
}
