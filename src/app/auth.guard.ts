import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // canActivate(): boolean {
  //   if (!this.authService.isLoggedIn()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.authService.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      // Token is invalid or has expired
      return false;
    }

    const payload = this.jwtHelper.decodeToken(token).data;
    if (!payload || payload.username !== 'Admin') {
      // User is not authorized
      return false;
    }

    // User is authorized
    return true;
  }
}
