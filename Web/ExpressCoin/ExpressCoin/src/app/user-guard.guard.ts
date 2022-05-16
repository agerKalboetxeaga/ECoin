import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// Logic class for cookie validation 
@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  
  constructor(private cookieService : CookieService,
              private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('token');
    if(!cookie){
      this.router.navigate(['/', 'login']);
      
      return false;
    }else {
       return true;
    }

   
  }
  
}
