import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { JWTResponse } from 'src/app/shared/models/jwtresponse.model';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const jwt = JSON.parse(localStorage.getItem('jwt')!) as JWTResponse;
    if (jwt && jwt.token && !this.jwtHelper.isTokenExpired()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
