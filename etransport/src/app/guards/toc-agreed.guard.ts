import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TocAgreedGuard implements CanActivate {
  constructor(
    private auhtService : AuthService,
    private router : Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.auhtService.getAuth();
    if(user.terms_and_condition == 0){
      return this.router.createUrlTree(['/terms-and-conditions']);
    }
    return true;
  }
}
