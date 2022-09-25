import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorService } from '../services/administrator.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminHasServiceGuard implements CanActivate {

  constructor(
    private administratorService : AdministratorService,
    private authService : AuthService,
    private router : Router
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    const user = this.authService.getAuth();
    
    if(user.role_id != 2){
      return true;
    }
    
    const res = await this.administratorService.getServiceByUserId(user.user_id)

    if(this.administratorService.hasService){
      return true;
    }

    if(res.status != 200){
      return this.router.createUrlTree(['setup-service']);
    }

    if(!res.data){
      return this.router.createUrlTree(['setup-service']);
    }
    this.administratorService.hasService = true;
    return true;
  }
  
}
