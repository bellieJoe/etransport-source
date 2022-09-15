import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifiedAdministratorGuard implements CanActivate {

  constructor(
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(user.role_id != 2){
      return true;
    }

    // return this.router.createUrlTree(['/administrator/unverified']);
    return true;
    
  }
  
}
